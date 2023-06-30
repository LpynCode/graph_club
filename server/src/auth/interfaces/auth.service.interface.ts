import { UserLoginDto } from '../dtos/user.login.dto';
import { UserRegisterDto } from '../dtos/user.register.dto';
import { UserModel } from '@prisma/client';

export interface IAuthService {
	login: (userLoginDto: UserLoginDto) => Promise<{ token: string, user: Omit<UserModel, 'password' | 'role'>|null } | null>;
	register: (userRegisterDto: UserRegisterDto) => Promise<UserModel | null>;
	verifyToken: (token: string) => Promise<boolean>;
}
