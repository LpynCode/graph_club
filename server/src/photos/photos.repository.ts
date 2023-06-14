import { IPhotosRepository } from './interfaces/photos.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { PhotosModel } from '@prisma/client';
import 'reflect-metadata';
import { PhotoEntity } from './enteties/photo.entity';

@injectable()
export class PhotosRepository implements IPhotosRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	async addPhoto({ authorId, link }: PhotoEntity): Promise<PhotosModel | null> {
		return this.prismaService.client.photosModel.create({
			data: { authorId, link },
		});
	}

	async addAvatar({ authorId, link }: PhotoEntity): Promise<PhotosModel | null> {
		const existAvatar = await this.prismaService.client.avatarModel.findFirst({
			where: { userId: authorId },
		});
		if (existAvatar)
			await this.prismaService.client.avatarModel.delete({ where: { userId: authorId } });
		return this.prismaService.client.photosModel.create({
			data: { authorId, link, avatar: { create: { userId: authorId } } },
		});
	}

	async getPhotosByAuthorId(authorId: number): Promise<PhotosModel[]> {
		return this.prismaService.client.photosModel.findMany({
			where: { authorId },
			orderBy: { createdAt: 'desc' },
		});
	}

	async removePhoto(photoId: number): Promise<PhotosModel> {
		return this.prismaService.client.photosModel.delete({ where: { id: photoId } });
	}

	async getPhotoById(photoId: number): Promise<PhotosModel | null> {
		return this.prismaService.client.photosModel.findFirst({ where: { id: photoId } });
	}
}
