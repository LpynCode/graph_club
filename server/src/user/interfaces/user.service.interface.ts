import { PhotosModel, UserModel } from '@prisma/client';
import { ChangeProfileDto } from '../dtos/update.profile.dto';
import { UploadedFile } from 'express-fileupload';

export interface IUserService {
	getUserByID: (id: number) => Promise<UserModel | null>;
	getAllDisplayUsers: () => Promise<Omit<UserModel, 'password' | 'role'>[]>;
	changeProfile: (id: number, data: ChangeProfileDto) => Promise<UserModel | null>;
	getDisplayUser: (id: number) => Promise<Omit<UserModel, 'password' | 'role'> | null>;
}
