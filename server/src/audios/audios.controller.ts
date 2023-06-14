import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { IAudiosController } from './interfaces/audios.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { HttpError } from '../errors/http.error';
import { IAudiosService } from './interfaces/audios.service.interface';
import { AudiosCreateDto } from './dto/audios-create.dto';

@injectable()
export class AudiosController extends BaseController implements IAudiosController {
	constructor(
		@inject(TYPES.AuthMiddleware) private readonly authMiddleware: AuthMiddleware,
		@inject(TYPES.AudiosService) private readonly audiosService: IAudiosService,
	) {
		super();
		this.bindRoutes([
			{
				method: 'post',
				path: '/create',
				func: this.addAudio,
				middlewares: [this.authMiddleware],
			},
			{
				method: 'get',
				path: '/:playlistId',
				func: this.getAudiosByPlaylistId,
				middlewares: [this.authMiddleware],
			},
			{
				method: 'delete',
				path: '/:audioId',
				func: this.removeAudio,
				middlewares: [this.authMiddleware],
			},
		]);
	}

	async addAudio(
		req: Request<{}, {}, AudiosCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const userId = Number(req.user.id);
			const file = req.files?.audio;
			if (!file) return next(new HttpError(402, 'Аудио не было добавлено'));
			if (file instanceof Array)
				return next(new HttpError(400, 'Возможно загрузить только 1 аудио'));
			const playlist = await this.audiosService.addAudioToPlaylist(userId, req.body, file);
			if (!playlist) return next(new HttpError(400, 'Ошибка создания'));
			this.created(res);
		} catch (e) {
			return next(e);
		}
	}

	async getAudiosByPlaylistId(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const playlistId = Number(req.params?.playlistId);
			if (!playlistId) return next(new HttpError(400, 'Некорректный id пользователя'));
			const playlists = await this.audiosService.getAllByPlaylistId(playlistId);
			this.ok(res, playlists);
		} catch (e) {
			return next(e);
		}
	}

	async removeAudio(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = Number(req.user.id);
			const audioId = Number(req.params?.audioId);
			if (!userId || !audioId) return next(new HttpError(400, 'Некорректный запрос'));
			const audio = await this.audiosService.removeAudio(audioId, audioId);
			if (!audio) return next(new HttpError(400, 'Ошибка удаления'));
			this.ok(res, audio);
		} catch (e) {
			return next(e);
		}
	}
}
