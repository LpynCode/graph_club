import { AudiosModel } from '@prisma/client';
import { AudiosCreateDto } from '../dto/audios-create.dto';
import { UploadedFile } from 'express-fileupload';

export interface IAudiosService {
	addAudioToPlaylist: (
		authorId: number,
		data: AudiosCreateDto,
		file: UploadedFile,
	) => Promise<AudiosModel | null>;
	getAllByPlaylistId: (playlistId: number) => Promise<AudiosModel[]>;
	removeAudio: (authorId: number, audioId: number) => Promise<AudiosModel | null>;
}
