import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { IPlaylistController } from './interfaces/playlist.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { IPlaylistService } from './interfaces/playlist.service.interface';
import { PlaylistCreateDto } from './dto/playlist-create.dto';
import { HttpError } from '../errors/http.error';

@injectable()
export class PlaylistController extends BaseController implements IPlaylistController {
	constructor(
		@inject(TYPES.AuthMiddleware) private readonly authMiddleware: AuthMiddleware,
		@inject(TYPES.PlaylistService) private readonly playlistService: IPlaylistService,
	) {
		super();
		this.bindRoutes([
			{
				method: 'post',
				path: '/create',
				func: this.createPlaylist,
				middlewares: [this.authMiddleware],
			},
			{
				method: 'get',
				path: '/:authorId',
				func: this.getAllByUserId,
				middlewares: [this.authMiddleware],
			},
			{
				method: 'get',
				path: '/:playlistId',
				func: this.getPlaylistById,
				middlewares: [this.authMiddleware],
			},
		]);
	}

	async createPlaylist(
		req: Request<{}, {}, PlaylistCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const userId = Number(req.user.id);
			const playlist = await this.playlistService.createPlaylist(userId, req.body);
			if (!playlist) return next(new HttpError(400, 'Ошибка создания'));
			this.created(res);
		} catch (e) {
			return next(e);
		}
	}

	async getAllByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const authorId = Number(req.params?.authorId);
			if (!authorId) return next(new HttpError(400, 'Некорректный id пользователя'));
			const playlists = await this.playlistService.getAllByAuthorId(authorId);
			this.ok(res, playlists);
		} catch (e) {
			return next(e);
		}
	}

	async getPlaylistById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const playlistId = Number(req.params.playlistId);
			if (!playlistId) return next(new HttpError(400, 'Некорректный id of playist'));
			const playlist = await this.playlistService.getPlaylistById(playlistId);
			if (!playlist) return next(new HttpError(404, 'Не найден'));
			this.ok(res, playlist);
		} catch (e) {
			return next(e);
		}
	}
}
