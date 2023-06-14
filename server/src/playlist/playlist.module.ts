import { ContainerModule } from 'inversify';
import { IPostController } from '../post/interfaces/post.controller.interface';
import { TYPES } from '../types';
import { IPlaylistRepository } from './interfaces/playlist.repository.interface';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './playlist.repository';
import { IPlaylistService } from './interfaces/playlist.service.interface';
import { PlaylistService } from './playlist.service';

export const PlaylistModule = new ContainerModule((bind) => {
	bind<PlaylistController>(TYPES.PlaylistController).to(PlaylistController);
	bind<IPlaylistService>(TYPES.PlaylistService).to(PlaylistService);
	bind<IPlaylistRepository>(TYPES.PlaylistRepository).to(PlaylistRepository);
});
