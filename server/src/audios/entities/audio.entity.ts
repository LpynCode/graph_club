import { IFilesEntity } from '../../files/interfaces/files.entity.interface';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import { FileTypes } from '../../files/interfaces/files.types';
import { PlaylistModel } from '@prisma/client';

export class Audio implements IFilesEntity {
	private readonly _link;
	private readonly _type: FileTypes = FileTypes.AUDIOS;
	constructor(
		private readonly _authorId: number,
		private readonly _name: string,
		private readonly _file: UploadedFile,
		private readonly _playlist: PlaylistModel | null | undefined = null,
	) {
		this._link = v4();
	}

	get link(): string {
		return this.type + '/' + this._link + '.mp3';
	}

	get type(): FileTypes {
		return this._type;
	}

	get authorId(): number {
		return this._authorId;
	}

	get name(): string {
		return this._name;
	}

	get playlistId(): number | null | undefined {
		return this._playlist?.id;
	}

	authorize(): boolean {
		return this._authorId === this._authorId;
	}

	async getPreparedFile(): Promise<Buffer | null> {
		if (!this._file.mimetype.includes('audio')) return null;
		return this._file.data;
	}
}
