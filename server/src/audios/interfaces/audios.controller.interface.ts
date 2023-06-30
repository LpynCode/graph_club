import { NextFunction, Request, Response } from 'express';

export interface IAudiosController {
	createAudio: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	removeAudio: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	addToMy: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getMyAudios: (req: Request, res: Response, next: NextFunction)=> Promise<void>
}
