import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import sharp from 'sharp';
import { IFilesEntity } from '../../files/interfaces/files.entity.interface';
import { FileTypes } from '../../files/interfaces/files.types';

export class PhotoEntity implements IFilesEntity {
	private readonly _link: string;
	readonly type: FileTypes = FileTypes.PHOTO;

	constructor(private readonly _authorId: number, private readonly _file: UploadedFile) {
		this._link = v4();
	}

	get authorId(): number {
		return this._authorId;
	}

	get link(): string {
		return this.type + '/' + this._link + '.webp';
	}

	async convertToWebP(): Promise<Buffer> {
		return sharp(this._file.data).webp().toBuffer();
	}

	async getPreparedFile(): Promise<Buffer | null> {
		if (!this._file.mimetype.includes('image')) return null;
		return await this.convertToWebP();
	}
}
