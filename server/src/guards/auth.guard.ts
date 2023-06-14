import { IMiddleware } from '../common/middleware.interface';
import { NextFunction, Request, Response } from 'express';

export class AuthGuard implements IMiddleware {
	constructor(private readonly role: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		const user = req.user;
		if (this.role == user.role) {
			return next();
		}
		res.status(401).send('Отказано в доступе');
	}
}
