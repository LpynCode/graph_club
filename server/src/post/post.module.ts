import { ContainerModule } from 'inversify';

import { TYPES } from '../types';
import { PostController } from './post.controller';
import { IPostRepository } from './interfaces/post.repository.interface';
import { IPostService } from './interfaces/posts.service.interface';
import { PostService } from './post.service';
import { IPostController } from './interfaces/post.controller.interface';
import { PostRepository } from './post.repository';

export const PostModule = new ContainerModule((bind) => {
	bind<IPostController>(TYPES.PostController).to(PostController);
	bind<IPostService>(TYPES.PostService).to(PostService);
	bind<IPostRepository>(TYPES.PostRepository).to(PostRepository);
});
