import { UserModel } from '@prisma/client';
import { User } from '../entities/user.entity';
export interface IUserRepository {
	getAllDisplayUsers: () => Promise<Omit<UserModel, 'password' | 'role'>[]>;
	getUserByEmail: (email: string) => Promise<UserModel | null>;
	getUserByID: (id: number) => Promise<UserModel | null>;
	createUser: (user: User) => Promise<UserModel>;
	changeProfile: (data: User) => Promise<UserModel | null>;
	getDisplayUser: (id: number) => Promise<Omit<UserModel, 'password' | 'role'> | null>;
}
