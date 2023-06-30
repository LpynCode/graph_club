import { AudiosModel, AddedAudiosModel, PlaylistModel, AudiosPlaylistModel } from '@prisma/client';
import { Audio } from '../entities/audio.entity';
import { AddToPlaylistDto } from '../dto/add-to-playlist.dto';

export interface IAudiosRepository {
	createAudio: (audio: Audio) => Promise<AudiosModel | null>;
	getById: (audioId: number) => Promise<AudiosModel | null>;
	removeById: (userId: number, audioId: number) => Promise<{ count: number }> ;
	getAudiosByUserId: (
		userId: number,
		limit: number,
		offset: number,
	) => Promise<AddedAudiosModel[]>;
	addToPlaylist: (data: AddToPlaylistDto) => Promise<AudiosPlaylistModel | null>;
	getAddedById: (userId: number, audioId: number) => Promise<AddedAudiosModel | null>;
	addToMy: (userId: number, audioId: number) => Promise<AddedAudiosModel | null>;
	findByName: (name: string, limit: number, offset: number) => Promise<AudiosModel[]>;
}
