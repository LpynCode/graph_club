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
				path: '/user/:authorId',
				func: this.getAllByUserId,
				middlewares: [this.authMiddleware],
			},
			{
				method: 'get',
				path: '/:playlistId',
				func: this.getPlaylistInfo,
				middlewares: [this.authMiddleware],
			},
			{
				method: 'delete',
				path: '/:playlistId',
				func: this.deleteByPlaylistId,
				middlewares: [this.authMiddleware]
			}

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
			this.ok(res, playlist);
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

	async getPlaylistInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const playlistId = Number(req.params.playlistId);
			if (!playlistId) return next(new HttpError(400, 'Некорректный id плейлиста'));
			const playlist = await this.playlistService.getPlaylistById(playlistId);
			if (!playlist) return next(new HttpError(404, 'Не найден'));
			this.ok(res, playlist);
		} catch (e) {
			return next(e);
		}
	}

	async deleteByPlaylistId(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const playlistId = Number(req.params.playlistId);
			const userId = Number(req.user.id);
			if (!playlistId) return next(new HttpError(400, 'Некорректный id плейлиста'));
			const playlist = await this.playlistService.deleteById(playlistId, userId);
			if(!playlist) return next(new HttpError(400, 'Ошибка удаления'));
			this.ok(res, playlist);
		} catch (e) {
			return next(e);
		}
	}
}
