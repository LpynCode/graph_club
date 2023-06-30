import { Playlist } from '../entity/playlist.entity';
import { PlaylistModel } from '@prisma/client';

export interface IPlaylistRepository {
	createPlaylist: (playlist: Playlist) => Promise<PlaylistModel | null>;
	getAllByAuthorId: (authorId: number) => Promise<PlaylistModel[]>;
	getPlaylistById: (playlistId: number) => Promise<PlaylistModel | null>;
	deleteById: (playlistId: number) => Promise<PlaylistModel | null>;
}
