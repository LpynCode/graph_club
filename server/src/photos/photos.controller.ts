import { BaseController } from '../common/base.controller';
import { IPhotosController } from './interfaces/photos.controller.interface';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { HttpError } from '../errors/http.error';
import 'reflect-metadata';
import { IPhotosService } from './interfaces/photos.service.interface';

@injectable()
export class PhotosController extends BaseController implements IPhotosController {
	constructor(
		@inject(TYPES.AuthMiddleware) private readonly authMiddleware: AuthMiddleware,
		@inject(TYPES.PhotosService) private readonly photosService: IPhotosService,
	) {
		super();
		this.bindRoutes([
			{
				path: '/add',
				method: 'post',
				func: this.addPhoto,
				middlewares: [this.authMiddleware],
			},
			{
				path: '/:authorId',
				method: 'get',
				func: this.getPhotosByAuthorId,
				middlewares: [this.authMiddleware],
			},
			{
				path: '/:photoId',
				method: 'delete',
				func: this.removePhoto,
				middlewares: [this.authMiddleware],
			},
		]);
	}

	async addPhoto(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const authorId = req.user.id;
			const file = req.files?.photo;
			if (!file) return next(new HttpError(402, 'Фото не было добавлено'));
			if (file instanceof Array)
				return next(new HttpError(400, 'Возможно загрузить только 1 фото'));

			const photo = await this.photosService.addPhoto(Number(authorId), file);
			if (!photo) return next(new HttpError(400, 'Ошибка добавления фотографии'));
			this.created(res);
		} catch (e) {
			return next(e);
		}
	}

	async getPhotosByAuthorId(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const authorId = Number(req.params.authorId);
			if (!authorId) return next(new HttpError(400, 'Некорректный ID'));
			const photos = await this.photosService.getPhotosByAuthorId(authorId);
			this.ok(res, photos);
		} catch (e) {
			return next(e);
		}
	}

	async removePhoto(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const authorId = Number(req.user.id);
			const photoId = Number(req.params.photoId);
			if (!photoId) return next(new HttpError(400, 'Некорректный id фотографии'));
			const deletedPhoto = await this.photosService.removePhoto(photoId, authorId);
			if (!deletedPhoto) return next(new HttpError(400, 'Ошибка удаления фотографии'));
			this.ok(res, deletedPhoto);
		} catch (e) {
			return next(e);
		}
	}
}
