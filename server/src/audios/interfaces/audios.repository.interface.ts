import { AudiosModel, PlaylistModel } from '@prisma/client';
import { Audio } from '../entities/audio.entity';

export interface IAudiosRepository {
	createAudio: (audio: Audio) => Promise<AudiosModel | null>;
	getAllByPlaylistId: (playlistId: number) => Promise<AudiosModel[]>;
	getById: (audioId: number) => Promise<AudiosModel | null>;
	removeById: (audioId: number) => Promise<AudiosModel | null>;
}
