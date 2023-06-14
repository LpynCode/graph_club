import { BaseController } from '../common/base.controller';
import { IPostController } from './interfaces/post.controller.interface';
import { Request, Response, NextFunction } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IPostService } from './interfaces/posts.service.interface';
import { CreatePostDto } from './dtos/create.post.dto';
import { HttpError } from '../errors/http.error';
import { UpdatePostDto } from './dtos/update.post.dto';
import { ValidateMiddleware } from '../middlewares/validate.middleware';

@injectable()
export class PostController extends BaseController implements IPostController {
	constructor(
		@inject(TYPES.PostService) private readonly postService: IPostService,
		@inject(TYPES.AuthMiddleware) private readonly authMiddleware: AuthMiddleware,
	) {
		super();
		this.bindRoutes([
			{
				path: '/',
				method: 'get',
				func: this.getAllPosts,
			},
			{
				path: '/create',
				method: 'post',
				func: this.createPost,
				middlewares: [this.authMiddleware, new ValidateMiddleware(CreatePostDto)],
			},
			{
				path: '/:postID',
				method: 'get',
				func: this.getPostByID,
			},
			{
				path: '/update',
				method: 'put',
				func: this.updatePost,
				middlewares: [this.authMiddleware, new ValidateMiddleware(UpdatePostDto)],
			},
			{
				path: '/delete/:id',
				method: 'delete',
				func: this.removePost,
				middlewares: [this.authMiddleware],
			},
		]);
	}

	async createPost(
		req: Request<{}, {}, CreatePostDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const file = req.files?.postPhotos;
			if (Array.isArray(file))
				return next(new HttpError(400, 'Возможно загрузить только 1 фото'));
			const post = await this.postService.createPost(Number(req.user.id), req.body, file);
			this.ok(res, post);
		} catch (e) {
			return next(e);
		}
	}

	async removePost(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const deletedPost = await this.postService.removePostByID(
				Number(req.user.id),
				Number(req.params.id),
			);
			if (!deletedPost) {
				return next(new HttpError(400, 'Ошибка удаления'));
			}
			this.ok(res, deletedPost);
		} catch (e) {
			next(e);
		}
	}

	async updatePost(
		req: Request<{}, {}, UpdatePostDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const post = await this.postService.updatePostByID(Number(req.user.id), req.body);
			this.ok(res, post);
		} catch (e) {
			return next(e);
		}
	}
	async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const posts = await this.postService.getAllPosts();
			this.ok(res, posts);
		} catch (e) {
			return next(e);
		}
	}

	async getPostByID(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const id = Number(req.params.postID);
			const post = await this.postService.getPostByID(id);
			if (!post) {
				return next(new HttpError(404, 'Пост не найден'));
			}
			this.ok(res, post);
		} catch (e) {
			return next(e);
		}
	}
}
