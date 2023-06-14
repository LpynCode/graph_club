import { IPhotosService } from './interfaces/photos.service.interface';
import { UploadedFile } from 'express-fileupload';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IPhotosRepository } from './interfaces/photos.repository.interface';
import { TYPES } from '../types';
import { IFilesService } from '../files/interfaces/files.service.interface';
import { PhotosModel } from '@prisma/client';
import { PhotoEntity } from './enteties/photo.entity';

@injectable()
export class PhotosService implements IPhotosService {
	constructor(
		@inject(TYPES.PhotosRepository) private readonly photosRepository: IPhotosRepository,
		@inject(TYPES.FilesService) private readonly filesService: IFilesService,
	) {}

	async addPhoto(authorId: number, photo: UploadedFile): Promise<PhotosModel | null> {
		const photoEntity = new PhotoEntity(authorId, photo);
		const isLoaded = await this.filesService.uploadFile(photoEntity);
		if (!isLoaded) return null;
		return this.photosRepository.addPhoto(photoEntity);
	}

	async changeAvatar(authorId: number, photo: UploadedFile): Promise<PhotosModel | null> {
		const photoEntity = new PhotoEntity(authorId, photo);
		const isLoaded = await this.filesService.uploadFile(photoEntity);
		if (!isLoaded) return null;
		return this.photosRepository.addAvatar(photoEntity);
	}

	async getPhotosByAuthorId(authorId: number): Promise<PhotosModel[]> {
		return this.photosRepository.getPhotosByAuthorId(authorId);
	}

	async removePhoto(photoId: number, authorId: number): Promise<PhotosModel | null> {
		const file = await this.photosRepository.getPhotoById(photoId);
		if (!file) return null;
		if (authorId != file.authorId) return null;
		await this.filesService.removeFile(file.link);
		return this.photosRepository.removePhoto(photoId);
	}
}
