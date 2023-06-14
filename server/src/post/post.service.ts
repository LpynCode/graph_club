import { IPostService } from './interfaces/posts.service.interface';
import { CreatePostDto } from './dtos/create.post.dto';
import { PostModel } from '@prisma/client';
import { IPostRepository } from './interfaces/post.repository.interface';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { Post } from './entities/post.entity';
import 'reflect-metadata';
import { UpdatePostDto } from './dtos/update.post.dto';
import { UploadedFile } from 'express-fileupload';
import { IFilesService } from '../files/interfaces/files.service.interface';
import { IPhotosService } from '../photos/interfaces/photos.service.interface';

@injectable()
export class PostService implements IPostService {
	constructor(
		@inject(TYPES.PostRepository) private readonly postRepository: IPostRepository,
		@inject(TYPES.PhotosService) private readonly photosService: IPhotosService,
	) {}

	async createPost(
		authorId: number,
		data: CreatePostDto,
		file?: UploadedFile,
	): Promise<PostModel> {
		const uploadedPhoto = file ? await this.photosService.addPhoto(authorId, file) : undefined;

		const postEntity = new Post(data.title, authorId, data?.description, uploadedPhoto?.id);
		return this.postRepository.createPost(postEntity);
	}

	async getAllPosts(): Promise<PostModel[]> {
		return this.postRepository.getAllPosts();
	}

	async getPostByID(id: number): Promise<PostModel | null> {
		return this.postRepository.getPostByID(id);
	}

	async updatePostByID(userID: number, dto: UpdatePostDto): Promise<PostModel | null> {
		const existedPost = await this.postRepository.getPostByID(dto.id);
		if (!existedPost) return null;
		const postEntity = new Post(
			existedPost.title,
			existedPost.authorId,
			existedPost.description,
			existedPost.photoId,
		)
			.updatePost(dto.description)
			.compareAuthorID(userID);
		if (!postEntity) return null;
		return this.postRepository.updatePostByID(existedPost.id, postEntity);
	}

	async removePostByID(userID: number, postID: number): Promise<PostModel | null> {
		const post = await this.postRepository.getPostByID(postID);
		if (!post) return null;
		const postEntity = new Post(
			post.title,
			post.authorId,
			post.description,
			post.photoId,
		).compareAuthorID(userID);
		if (!postEntity) return null;
		return this.postRepository.removePostByID(post.id);
	}
}
