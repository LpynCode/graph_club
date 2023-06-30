import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { AudiosModel, AudiosPlaylistModel, PlaylistModel, AddedAudiosModel } from '@prisma/client';
import { IAudiosRepository } from './interfaces/audios.repository.interface';
import { Audio } from './entities/audio.entity';
import { AddToPlaylistDto } from './dto/add-to-playlist.dto';

@injectable()
export class AudiosRepository implements IAudiosRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	async createAudio({ authorId, name, link }: Audio): Promise<AudiosModel | null> {
		return this.prismaService.client.audiosModel.create({
			data: { authorId, name, link, addedTo: { create: [{ authorId }] } },
		});
	}

	async addToMy(authorId: number, audioId: number): Promise<AddedAudiosModel | null> {
		return this.prismaService.client.addedAudiosModel.create({ data: { authorId, audioId }, include: {audio: true} });
	}

	async addToPlaylist(data: AddToPlaylistDto): Promise<AudiosPlaylistModel | null> {
		return this.prismaService.client.audiosPlaylistModel.create({
			data: data,
		});
	}

	async getById(id: number): Promise<AudiosModel | null> {
		return this.prismaService.client.audiosModel.findFirst({ where: { id } });
	}

	async removeById(authorId: number, audioId: number): Promise<{ count: number }> {
		return this.prismaService.client.addedAudiosModel.deleteMany({
			where: { AND: { authorId, audioId } },
		});
	}

	async findByName(name: string, limit: number, offset: number): Promise<AudiosModel[]> {
		return this.prismaService.client.audiosModel.findMany({
			where: { name: { contains: name, mode: 'insensitive' },  },
			skip: offset,
			take: limit,
		});
	}

	async getAddedById(userId: number, audioId: number): Promise<AddedAudiosModel | null> {
		return this.prismaService.client.addedAudiosModel.findFirst({
			where: { authorId: userId, audioId },
		});
	}

	async getAudiosByUserId(
		authorId: number,
		limit: number,
		offset: number,
	): Promise<AddedAudiosModel[]> {
		return this.prismaService.client.addedAudiosModel.findMany({
			where: { authorId },
			include: { audio: true },
			skip: offset,
			take: limit,
			orderBy: {createdAt: 'desc'}
		});
	}
}
