import { AudiosModel, AddedAudiosModel, AudiosPlaylistModel } from '@prisma/client';
import { AudiosCreateDto } from '../dto/audios-create.dto';
import { UploadedFile } from 'express-fileupload';
import { AddToPlaylistDto } from '../dto/add-to-playlist.dto';

export interface IAudiosService {
	createAudio: (
		authorId: number,
		data: AudiosCreateDto,
		file: UploadedFile,
	) => Promise<AudiosModel | null>;
	removeAudio: (authorId: number, audioId: number) => Promise<{id: number} | null>;
	getAudiosByUserId: (
		userId: number,
		limit: number,
		offset: number,
	) => Promise<AddedAudiosModel[]>;
	addToPlaylist: (data: AddToPlaylistDto) => Promise<AudiosPlaylistModel | null>;
	addToMy: (userId: number, audioId: number) => Promise<AddedAudiosModel | null>;
	findAudioByName: (name: string, limit: number, offset: number) => Promise<AudiosModel[]>;
}
