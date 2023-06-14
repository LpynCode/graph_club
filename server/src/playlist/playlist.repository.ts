import { inject, injectable } from 'inversify';
import { IPlaylistRepository } from './interfaces/playlist.repository.interface';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { Playlist } from './entity/playlist.entity';
import { PlaylistModel } from '@prisma/client';

@injectable()
export class PlaylistRepository implements IPlaylistRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	async createPlaylist({ authorId, name, description }: Playlist): Promise<PlaylistModel | null> {
		return this.prismaService.client.playlistModel.create({
			data: { authorId, name, description },
		});
	}

	async getAllByAuthorId(authorId: number): Promise<PlaylistModel[]> {
		return this.prismaService.client.playlistModel.findMany({ where: { authorId } });
	}

	async getPlaylistById(playlistId: number): Promise<PlaylistModel | null> {
		return this.prismaService.client.playlistModel.findFirst({ where: { id: playlistId } });
	}
}
