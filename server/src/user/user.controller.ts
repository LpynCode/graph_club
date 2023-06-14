import { BaseController } from '../common/base.controller';
import { IUserController } from './interfaces/user.controller.interface';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { IUserService } from './interfaces/user.service.interface';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { HttpError } from '../errors/http.error';
import { ChangeProfileDto } from './dtos/update.profile.dto';
import { ValidateMiddleware } from '../middlewares/validate.middleware';
import { IPhotosService } from '../photos/interfaces/photos.service.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.UserService) private readonly userService: IUserService,
		@inject(TYPES.AuthMiddleware) private readonly authMiddleware: AuthMiddleware,
		@inject(TYPES.PhotosService) private photosService: IPhotosService,
	) {
		super();
		this.bindRoutes([
			{
				path: '/:id',
				method: 'get',
				func: this.getUserInfo,
			},
			{
				path: '/',
				method: 'get',
				func: this.getAllUsers,
			},
			{
				path: '/update',
				method: 'put',
				func: this.changeProfile,
				middlewares: [this.authMiddleware, new ValidateMiddleware(ChangeProfileDto)],
			},
			{
				path: '/changeAvatar',
				method: 'put',
				func: this.changeAvatar,
				middlewares: [this.authMiddleware],
			},
		]);
	}

	async getUserInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = Number(req.params.id);
			if (!userId) {
				return next(new HttpError(422, 'Некорректный запрос'));
			}
			const user = await this.userService.getDisplayUser(userId);
			this.ok(res, user);
		} catch (e) {
			return next(e);
		}
	}

	async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const users = await this.userService.getAllDisplayUsers();
			this.ok(res, users);
		} catch (e) {
			return next(e);
		}
	}

	async changeProfile(
		req: Request<{}, {}, ChangeProfileDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const userId = Number(req.user.id);
			const user = await this.userService.changeProfile(userId, req.body);
			if (!user) return next(new HttpError(400, 'Пользователь с данным id не найден'));
			const displayUser = await this.userService.getDisplayUser(user.id);
			this.ok(res, displayUser);
		} catch (e) {
			return next(e);
		}
	}

	async changeAvatar(req: Request, res: Response, next: NextFunction): Promise<void> {
		const authorId = Number(req.user.id);
		const file = req.files?.photo;
		if (!file) return next(new HttpError(402, 'Фото не было добавлено'));
		if (file instanceof Array)
			return next(new HttpError(400, 'Возможно загрузить только 1 фото'));
		try {
			const photo = await this.photosService.changeAvatar(authorId, file);
			this.ok(res, photo);
		} catch (e) {
			return next(e);
		}
	}
}
