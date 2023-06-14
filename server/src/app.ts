import express, { Express } from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import { UserController } from './user/user.controller';
import { PrismaService } from './database/prisma.service';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { ILoggerService } from './logger/logger.service.interface';
import { AuthController } from './auth/auth.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { PostController } from './post/post.controller';
import fileUpload from 'express-fileupload';
import { IUserController } from './user/interfaces/user.controller.interface';
import cors from 'cors';
import { PhotosController } from './photos/photos.controller';
import { PlaylistController } from './playlist/playlist.controller';
import { AudiosController } from './audios/audios.controller';
@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
		@inject(TYPES.ConfigService) private readonly configService: IConfigService,
		@inject(TYPES.UserController) private readonly userController: IUserController,
		@inject(TYPES.PrismaService) private readonly prismaService: PrismaService,
		@inject(TYPES.AuthController) private readonly authController: AuthController,
		@inject(TYPES.ExceptionFilter) private readonly exceptionFilter: IExceptionFilter,
		@inject(TYPES.PostController) private readonly postController: PostController,
		@inject(TYPES.PhotosController) private readonly photosController: PhotosController,
		@inject(TYPES.PlaylistController) private readonly playlistController: PlaylistController,
		@inject(TYPES.AudiosController) private readonly audiosController: AudiosController,
	) {
		this.app = express();
		this.port = Number(this.configService.get('PORT'));
	}

	useMiddlewares(): void {
		this.app.use(bodyParser.json());
		this.app.use(
			cors({
				origin: 'http://localhost:5173',
			}),
		);
		this.app.use('/public', express.static('static'));
		this.app.use(fileUpload({ abortOnLimit: true, responseOnLimit: 'Превышен лимит файлов' }));
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/auth', this.authController.router);
		this.app.use('/posts', this.postController.router);
		this.app.use('/photos', this.photosController.router);
		this.app.use('/playlist', this.playlistController.router);
		this.app.use('/audios', this.audiosController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddlewares();
		this.useRoutes();
		this.useExceptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.loggerService.info(`[APP] Сервер запущен на ${this.port} порту`);
	}

	public close(): void {
		this.server.close();
	}
}
