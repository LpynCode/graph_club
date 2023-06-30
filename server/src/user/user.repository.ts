import { IUserRepository } from './interfaces/user.repository.interface';
import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { User } from './entities/user.entity';
import 'reflect-metadata';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createUser({ email, displayName, password }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				displayName,
				password,
			},
		});
	}

	async changeProfile({ email, displayName }: User): Promise<UserModel | null> {
		return this.prismaService.client.userModel.update({
			where: { email },
			data: { displayName },
		});
	}

	async getDisplayUser(id: number): Promise<Omit<UserModel, 'password' | 'role'> | null> {
		return this.prismaService.client.userModel.findFirst({
			where: { id },
			select: {
				id: true,
				email: true,
				displayName: true,
				avatar: {
					select: { createdAt: true, photo: { select: { link: true, id: true } } },
				},
				posts: true,
				added_audios: {select: {audio: true}}
			},
		});
	}

	async getAllDisplayUsers(): Promise<Omit<UserModel, 'password' | 'role'>[]> {
		return this.prismaService.client.userModel.findMany({
			select: {
				id: true,
				email: true,
				displayName: true,
				avatar: {
					select: { createdAt: true, photo: { select: { link: true, id: true } } },
				},
				audios: true
			},
		});
	}

	async getUserByID(id: number): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: { id },
		});
	}

	async getUserByEmail(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({ where: { email } });
	}
}
