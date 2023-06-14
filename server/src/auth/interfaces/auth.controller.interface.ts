import { NextFunction, Request, Response } from 'express';

export interface IAuthController {
	login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	verifyToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
