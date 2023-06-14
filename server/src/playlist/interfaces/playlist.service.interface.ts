import { PlaylistCreateDto } from '../dto/playlist-create.dto';
import { PlaylistModel } from '@prisma/client';

export interface IPlaylistService {
	createPlaylist: (userId: number, data: PlaylistCreateDto) => Promise<PlaylistModel | null>;
	getAllByAuthorId: (authorId: number) => Promise<PlaylistModel[]>;
	getPlaylistById: (playlistId: number) => Promise<PlaylistModel | null>;
}
