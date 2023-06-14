import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IAudiosRepository } from './interfaces/audios.repository.interface';
import { IAudiosService } from './interfaces/audios.service.interface';
import { AudiosModel } from '@prisma/client';
import { AudiosCreateDto } from './dto/audios-create.dto';
import { Audio } from './entities/audio.entity';
import { IPlaylistService } from '../playlist/interfaces/playlist.service.interface';
import { UploadedFile } from 'express-fileupload';
import { IFilesService } from '../files/interfaces/files.service.interface';

@injectable()
export class AudiosService implements IAudiosService {
	constructor(
		@inject(TYPES.AudiosRepository) private readonly audiosRepository: IAudiosRepository,
		@inject(TYPES.PlaylistService) private readonly playlistService: IPlaylistService,
		@inject(TYPES.FilesService) private readonly filesService: IFilesService,
	) {}

	async addAudioToPlaylist(
		authorId: number,
		{ name, playlistId }: AudiosCreateDto,
		file: UploadedFile,
	): Promise<AudiosModel | null> {
		const playlist = await this.playlistService.getPlaylistById(playlistId);
		if (!playlist) return null;
		const audioEntity = new Audio(authorId, name, file, playlist);
		if (!audioEntity.authorize()) return null;
		const uploaded = await this.filesService.uploadFile(audioEntity);
		if (!uploaded) return null;
		return this.audiosRepository.createAudio(audioEntity);
	}

	async getAllByPlaylistId(playlistId: number): Promise<AudiosModel[]> {
		return this.audiosRepository.getAllByPlaylistId(playlistId);
	}

	async removeAudio(authorId: number, audioId: number): Promise<AudiosModel | null> {
		const audio = await this.audiosRepository.getById(audioId);
		if (!audio) return null;
		if (audioId !== audio.authorId) return null;
		await this.filesService.removeFile(audio.link);
		return this.audiosRepository.removeById(audioId);
	}
}
