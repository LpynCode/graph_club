import { IMiddleware } from '../common/middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthJwtPayload } from '../auth/dtos/auth.jwt.payload';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import 'reflect-metadata';
import { HttpError } from '../errors/http.error';

@injectable()
export class AuthMiddleware implements IMiddleware {
	constructor(@inject(TYPES.ConfigService) private readonly configService: IConfigService) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		const bearer = req.headers.authorization?.split(' ')[0];
		const token = req.headers.authorization?.split(' ')[1];
		if (bearer == 'Bearer' && token) {
			verify(token, this.configService.get('SECRET_KEY'), (err, payload) => {
				if (err) {
					next(new HttpError(401, 'Не авторизован'));
				} else if (typeof payload == 'object') {
					req.user = payload as AuthJwtPayload;
					next();
				}
			});
		} else {
			next(new HttpError(401, 'Не авторизован'));
		}
	}
}
