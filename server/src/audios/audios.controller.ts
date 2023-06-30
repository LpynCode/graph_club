import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { IAudiosController } from './interfaces/audios.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { HttpError } from '../errors/http.error';
import { IAudiosService } from './interfaces/audios.service.interface';
import { AudiosCreateDto } from './dto/audios-create.dto';
import { ValidateMiddleware } from '../middlewares/validate.middleware';
import { AddToPlaylistDto } from './dto/add-to-playlist.dto';

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
				func: this.createAudio,
				middlewares: [this.authMiddleware, new ValidateMiddleware(AudiosCreateDto)],
			},
			{
				method: 'post',
				path: '/add',
				func: this.addToPlaylist,
				middlewares: [this.authMiddleware, new ValidateMiddleware(AddToPlaylistDto)],
			},
			{
				method: 'get',
				path: '/addToMy/:audioId',
				func: this.addToMy,
				middlewares: [this.authMiddleware]
			},
			{
				method: 'get',
				path: '/myAudios',
				func: this.getMyAudios,
				middlewares: [this.authMiddleware]
			},
			{
				method: 'get',
				path: '/user/:userId',
				func: this.getAudiosByUserId,
				middlewares: [this.authMiddleware],
			},
			{
				method: 'delete',
				path: '/:audioId',
				func: this.removeAudio,
				middlewares: [this.authMiddleware],
			},
			{
				method: 'get',
				path: '/find/:name',
				func: this.findAudioByName,
				middlewares: [this.authMiddleware]
			}
		]);
	}

	async addToPlaylist(
		{ body }: Request<{}, {}, AddToPlaylistDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const audiosPlaylist = await this.audiosService.addToPlaylist(body);
			if (!audiosPlaylist) return next(new HttpError(400, 'Ошибка добавления'));
			this.ok(res, audiosPlaylist);
		} catch (e) {
			return next(e);
		}
	}

	async getMyAudios(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = Number(req.user.id);
			const { limit = 10, offset = 0 } = req.query;
			const audios = await this.audiosService.getAudiosByUserId(userId, Number(limit), Number(offset));
			this.ok(res, audios);
		} catch (e) {
			return next(e);
		}
	}

	async findAudioByName(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const {name} = req.params;
			const { limit = 10, offset = 0 } = req.query;
			const audio = await this.audiosService.findAudioByName(name, Number(limit), Number(offset));
			this.ok(res, audio);
		} catch (e) {
			return next(e);
		}
	}

	async addToMy(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = Number(req.user.id);
			const audioId = Number(req.params.audioId);
			const added = await this.audiosService.addToMy(userId, audioId);
			if(!added) return next(new HttpError(400, "Ошибка добавления"));
			this.ok(res, added);
		} catch (e) {
			return next(e);
		}

	}

	async createAudio(
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
			const audio = await this.audiosService.createAudio(userId, req.body, file);
			if (!audio) return next(new HttpError(400, 'Ошибка создания'));
			this.ok(res, audio);
		} catch (e) {
			return next(e);
		}
	}

	async getAudiosByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = Number(req.params?.userId);
			if (!userId) return next(new HttpError(400, 'Некорректный id пользователя'));
			const { limit = 10, offset = 0 } = req.query;
			const audios = await this.audiosService.getAudiosByUserId(
				userId,
				Number(limit),
				Number(offset),
			);
			this.ok(res, audios);
		} catch (e) {
			return next(e);
		}
	}

	async removeAudio(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = Number(req.user.id);
			const audioId = Number(req.params?.audioId);
			if (!userId || !audioId) return next(new HttpError(400, 'Некорректный запрос'));
			const audio = await this.audiosService.removeAudio(userId, audioId);
			if (!audio) return next(new HttpError(400, 'Ошибка удаления'));
			this.ok(res, audio);
		} catch (e) {
			return next(e);
		}
	}
}
