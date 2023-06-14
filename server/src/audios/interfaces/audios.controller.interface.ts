import { NextFunction, Request, Response } from 'express';

export interface IAudiosController {
	addAudio: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getAudiosByPlaylistId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	removeAudio: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
