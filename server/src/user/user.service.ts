import { IUserService } from './interfaces/user.service.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUserRepository } from './interfaces/user.repository.interface';
import { TYPES } from '../types';
import { PhotosModel, UserModel } from '@prisma/client';
import { IConfigService } from '../config/config.service.interface';
import { ChangeProfileDto } from './dtos/update.profile.dto';
import { User } from './entities/user.entity';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {}

	async getAllDisplayUsers(): Promise<Omit<UserModel, 'password' | 'role'>[]> {
		return this.userRepository.getAllDisplayUsers();
	}

	async getDisplayUser(id: number): Promise<Omit<UserModel, 'password' | 'role'> | null> {
		return this.userRepository.getDisplayUser(id);
	}

	async getUserByID(id: number): Promise<UserModel | null> {
		return this.userRepository.getUserByID(id);
	}

	async changeProfile(id: number, { displayName }: ChangeProfileDto): Promise<UserModel | null> {
		const userFromDB = await this.userRepository.getUserByID(id);
		if (!userFromDB) return null;
		const changedUser = new User(
			userFromDB.displayName,
			userFromDB.email,
			userFromDB.role,
		).changeProfile(displayName);
		return this.userRepository.changeProfile(changedUser);
	}
}
