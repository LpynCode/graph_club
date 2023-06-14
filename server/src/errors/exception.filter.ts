import { IExceptionFilter } from './exception.filter.interface';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from './http.error';
import { inject, injectable } from 'inversify';
import { ILoggerService } from '../logger/logger.service.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.LoggerService) private loggerService: ILoggerService) {}
	catch(err: HttpError | Error, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HttpError) {
			this.loggerService.error(`[${err.context}] ${err.message}`);
			res.status(err.statusCode).send({ message: err.message });
		} else {
			this.loggerService.error(`[Internal server error] ${err.message}`);
			res.status(500).send({ message: 'Непредвиденная ошибка' });
		}
	}
}
