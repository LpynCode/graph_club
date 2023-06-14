import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IPlaylistRepository } from './interfaces/playlist.repository.interface';
import { IPlaylistService } from './interfaces/playlist.service.interface';
import { Playlist } from './entity/playlist.entity';
import { PlaylistCreateDto } from './dto/playlist-create.dto';
import { PlaylistModel } from '@prisma/client';

@injectable()
export class PlaylistService implements IPlaylistService {
	constructor(
		@inject(TYPES.PlaylistRepository) private readonly playlistRepository: IPlaylistRepository,
	) {}

	async createPlaylist(userId: number, data: PlaylistCreateDto): Promise<PlaylistModel | null> {
		const playlistEntity = new Playlist(userId, data.name, data.description);
		return this.playlistRepository.createPlaylist(playlistEntity);
	}

	async getAllByAuthorId(authorId: number): Promise<PlaylistModel[]> {
		return this.playlistRepository.getAllByAuthorId(authorId);
	}

	async getPlaylistById(playlistId: number): Promise<PlaylistModel | null> {
		return this.playlistRepository.getPlaylistById(playlistId);
	}
}
