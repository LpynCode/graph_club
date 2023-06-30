import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IAudiosRepository } from './interfaces/audios.repository.interface';
import { IAudiosService } from './interfaces/audios.service.interface';
import { AudiosModel, AudiosPlaylistModel, AddedAudiosModel } from '@prisma/client';
import { AudiosCreateDto } from './dto/audios-create.dto';
import { Audio } from './entities/audio.entity';
import { IPlaylistService } from '../playlist/interfaces/playlist.service.interface';
import { UploadedFile } from 'express-fileupload';
import { IFilesService } from '../files/interfaces/files.service.interface';
import { AddToPlaylistDto } from './dto/add-to-playlist.dto';

@injectable()
export class AudiosService implements IAudiosService {
	constructor(
		@inject(TYPES.AudiosRepository) private readonly audiosRepository: IAudiosRepository,
		@inject(TYPES.PlaylistService) private readonly playlistService: IPlaylistService,
		@inject(TYPES.FilesService) private readonly filesService: IFilesService,
	) {}

	async createAudio(
		authorId: number,
		{ name }: AudiosCreateDto,
		file: UploadedFile,
	): Promise<AudiosModel | null> {
		const audioEntity = new Audio(authorId, name, file);
		const uploaded = await this.filesService.uploadFile(audioEntity);
		if (!uploaded) return null;
		return this.audiosRepository.createAudio(audioEntity);
	}

	async removeAudio(userId: number, audioId: number): Promise<{ id: number } | null> {
		const audio = await this.audiosRepository.getAddedById(userId, audioId);
		if (!audio) return null;
		const {count} = await this.audiosRepository.removeById(userId, audioId);
		if(count == 1) {
			return {id: audioId};
		}
		return null;
	}

	async findAudioByName(name: string, limit: number, offset: number): Promise<AudiosModel[]> {
		return this.audiosRepository.findByName(name, limit, offset);
	}

	async addToMy(userId: number, audioId: number): Promise<AddedAudiosModel | null> {
		const existed = await this.audiosRepository.getAddedById(userId, audioId);
		if(existed) return null;
    	return this.audiosRepository.addToMy(userId, audioId);
	}

	async getAudiosByUserId(
		userId: number,
		limit: number,
		offset: number,
	): Promise<AddedAudiosModel[]> {
		return this.audiosRepository.getAudiosByUserId(userId, limit, offset);
	}

	async addToPlaylist(data: AddToPlaylistDto): Promise<AudiosPlaylistModel | null> {
		return this.audiosRepository.addToPlaylist(data);
	}
}
