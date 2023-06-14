import { UploadedFile } from 'express-fileupload';
import { PhotoEntity } from '../../photos/enteties/photo.entity';
import { IFilesEntity } from './files.entity.interface';

export interface IFilesService {
	uploadFile: (entity: IFilesEntity) => Promise<boolean>;
	removeFile: (filePath: string) => Promise<void>;
}
