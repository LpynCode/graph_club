import { Request, Response, NextFunction } from 'express';

export interface IPostController {
	getPostByID: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getAllPosts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	createPost: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	updatePost: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	removePost: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
