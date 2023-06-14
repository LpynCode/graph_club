import { NextFunction, Request, Response } from 'express';

export interface IPhotosController {
	addPhoto(req: Request, res: Response, next: NextFunction): Promise<void>;
	getPhotosByAuthorId(req: Request, res: Response, next: NextFunction): Promise<void>;
}
