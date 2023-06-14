import { BaseController } from '../common/base.controller';
import { IAuthController } from './interfaces/auth.controller.interface';
import { UserLoginDto } from './dtos/user.login.dto';
import { UserRegisterDto } from './dtos/user.register.dto';
import { TYPES } from '../types';
import { inject } from 'inversify';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IAuthService } from './interfaces/auth.service.interface';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http.error';
import { ValidateMiddleware } from '../middlewares/validate.middleware';
import { JwtVerifyDto } from './dtos/jwt.verify.dto';

@injectable()
export class AuthController extends BaseController implements IAuthController {
	constructor(@inject(TYPES.AuthService) private authService: IAuthService) {
		super();
		this.bindRoutes([
			{
				path: '/register',
				func: this.register,
				method: 'post',
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				func: this.login,
				method: 'post',
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/verifyToken',
				func: this.verifyToken,
				method: 'post'
			}
		]);
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const token = await this.authService.login(body);
			if (!token) {
				return next(new HttpError(422, 'Неверный логин или пароль'));
			}
			this.ok(res, token);
		} catch (e) {
			return next(e);
		}
	}

	async verifyToken({body}: Request<{}, {}, JwtVerifyDto>, res: Response, next: NextFunction): Promise<void> {
		
		try{
			this.ok(res, this.authService.verifyToken(body.token));
		} catch(e) {
			return next(e);
		}
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const user = await this.authService.register(body);
			if (!user) {
				return next(new HttpError(422, 'Пользователь уже существует'));
			}
			this.ok(res, user);
		} catch (e) {
			return next(e);
		}
	}
}
