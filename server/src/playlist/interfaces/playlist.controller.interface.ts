import { NextFunction, Request, Response } from 'express';

export interface IPlaylistController {
	createPlaylist: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getAllByUserId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
