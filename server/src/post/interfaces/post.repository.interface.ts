import { PostModel } from '@prisma/client';
import { Post } from '../entities/post.entity';
import { UpdatePostDto } from '../dtos/update.post.dto';

export interface IPostRepository {
	createPost: (data: Post) => Promise<PostModel>;
	getAllPosts: () => Promise<PostModel[]>;
	getPostByID: (postID: number) => Promise<PostModel | null>;
	updatePostByID: (id: number, post: Post) => Promise<PostModel>;
	removePostByID: (id: number) => Promise<PostModel | null>;
}
