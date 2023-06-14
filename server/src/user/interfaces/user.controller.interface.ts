import { Request, Response, NextFunction, Router } from 'express';

export interface IUserController {
	router: Router;
	getUserInfo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	changeProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	changeAvatar: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
