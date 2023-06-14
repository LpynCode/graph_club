import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { AudiosModel, PlaylistModel } from '@prisma/client';
import { Playlist } from '../playlist/entity/playlist.entity';
import { IAudiosRepository } from './interfaces/audios.repository.interface';
import { Audio } from './entities/audio.entity';

@injectable()
export class AudiosRepository implements IAudiosRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	async createAudio({ authorId, name, link, playlistId }: Audio): Promise<AudiosModel | null> {
		return this.prismaService.client.audiosModel.create({
			data: { authorId, name, link, playlistId },
		});
	}

	async getAllByPlaylistId(playlistId: number): Promise<AudiosModel[]> {
		return this.prismaService.client.audiosModel.findMany({ where: { playlistId } });
	}

	async getById(id: number): Promise<AudiosModel | null> {
		return this.prismaService.client.audiosModel.findFirst({ where: { id } });
	}

	async removeById(id: number): Promise<AudiosModel | null> {
		return this.prismaService.client.audiosModel.delete({ where: { id } });
	}
}
