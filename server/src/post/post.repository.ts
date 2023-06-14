import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { IPostRepository } from './interfaces/post.repository.interface';
import { PostModel } from '@prisma/client';
import { Post } from './entities/post.entity';
import 'reflect-metadata';

@injectable()
export class PostRepository implements IPostRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createPost({ title, description, authorId, photoId }: Post): Promise<PostModel> {
		return this.prismaService.client.postModel.create({
			data: { title, description, authorId, photoId },
		});
	}

	async getAllPosts(): Promise<PostModel[]> {
		return this.prismaService.client.postModel.findMany();
	}

	async getPostByID(id: number): Promise<PostModel | null> {
		return this.prismaService.client.postModel.findFirst({ where: { id } });
	}

	async updatePostByID(id: number, { description }: Post): Promise<PostModel> {
		return this.prismaService.client.postModel.update({ where: { id }, data: { description } });
	}

	async removePostByID(id: number): Promise<PostModel | null> {
		return this.prismaService.client.postModel.delete({ where: { id } });
	}
}
