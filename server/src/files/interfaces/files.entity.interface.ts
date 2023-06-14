import { FileTypes } from './files.types';
import { UploadedFile } from 'express-fileupload';

export interface IFilesEntity {
	type: FileTypes;
	link: string;
	getPreparedFile: () => Promise<Buffer | null>;
}
