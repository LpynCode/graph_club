import { CreatePostDto } from '../dtos/create.post.dto';
import { PostModel } from '@prisma/client';
import { UpdatePostDto } from '../dtos/update.post.dto';
import { UploadedFile } from 'express-fileupload';

export interface IPostService {
	createPost: (authorId: number, data: CreatePostDto, file?: UploadedFile) => Promise<PostModel>;
	getAllPosts: () => Promise<PostModel[]>;
	getPostByID: (id: number) => Promise<PostModel | null>;
	updatePostByID: (userID: number, data: UpdatePostDto) => Promise<PostModel | null>;
	removePostByID: (userID: number, postID: number) => Promise<PostModel | null>;
}
