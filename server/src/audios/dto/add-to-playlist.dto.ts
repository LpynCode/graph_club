import { IsNumber } from 'class-validator';

export class AddToPlaylistDto {
	@IsNumber()
	playlistId: number;

	@IsNumber()
	audioId: number;
}
