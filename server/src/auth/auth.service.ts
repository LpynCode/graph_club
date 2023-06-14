import { IAuthService } from './interfaces/auth.service.interface';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserRegisterDto } from './dtos/user.register.dto';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { IUserRepository } from '../user/interfaces/user.repository.interface';
import { User } from '../user/entities/user.entity';
import { IConfigService } from '../config/config.service.interface';
import { AuthJwtPayload } from './dtos/auth.jwt.payload';
import { sign } from 'jsonwebtoken';
import { Role, UserModel } from '@prisma/client';
import { verify } from 'jsonwebtoken';

@injectable()
export class AuthService implements IAuthService {
	constructor(
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {}
	async login({ email, password }: UserLoginDto): Promise<{
		token: string;
		user: Omit<UserModel, 'password' | 'role'> | null;
	} | null> {
		const userFromDB = await this.userRepository.getUserByEmail(email);
		if (!userFromDB) return null;
		const userEntity = new User(
			userFromDB.displayName,
			userFromDB.email,
			userFromDB.role,
			userFromDB.password,
		);
		const passwordSync = await userEntity.comparePassword(password);
		if (!passwordSync) return null;
		const token = await this.generateToken(
			{ id: userFromDB.id.toString(), email: userFromDB.email, role: userFromDB.role },
			this.configService.get('SECRET_KEY'),
		);
		const user = await this.userRepository.getDisplayUser(userFromDB.id);
		return { token, user };
	}

	async register({ displayName, email, password }: UserRegisterDto): Promise<UserModel | null> {
		const existedUser = await this.userRepository.getUserByEmail(email);
		if (existedUser) return null;
		const userEntity = new User(displayName, email, Role.USER);
		const salt = this.configService.get('PASSWORD_SALT');
		await userEntity.setPassword(password, Number(salt));
		return this.userRepository.createUser(userEntity);
	}

	private generateToken(payload: AuthJwtPayload, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(payload, secret, { algorithm: 'HS256', expiresIn: '1h' }, (err, token) => {
				if (err) {
					reject(err);
				}
				resolve(token as string);
			});
		});
	}

	verifyToken(token: string): boolean {
		try {
			const decoded = verify(token, this.configService.get('SECRET_KEY'));
			return true;
		} catch (e) {
			return false;
		}
	}
}
