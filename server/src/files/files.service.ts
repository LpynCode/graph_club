import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IFilesService } from './interfaces/files.service.interface';
import { ensureDir, remove, writeFile } from 'fs-extra';
import { path } from 'app-root-path';
import * as pth from 'path';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/logger.service.interface';
import { IFilesEntity } from './interfaces/files.entity.interface';
import { FileTypes } from './interfaces/files.types';

@injectable()
export class FilesService implements IFilesService {
	staticDirPath: string;
	constructor(@inject(TYPES.LoggerService) private readonly loggerService: ILoggerService) {
		this.staticDirPath = pth.join(path, 'static');
	}

	getDirPath(type: FileTypes): string {
		return pth.join(this.staticDirPath, type);
	}

	async uploadFile(entity: IFilesEntity): Promise<boolean> {
		const buffer = await entity.getPreparedFile();
		if (!buffer) return false;
		const dirPath = pth.join(this.staticDirPath, entity.type);
		await ensureDir(dirPath);
		await writeFile(pth.join(this.staticDirPath, entity.link), buffer);
		return true;
	}
	/*async uploadPhoto(photo: PhotoEntity): Promise<boolean> {
		if (!photo.file.mimetype.includes('image')) return false;
		const buffer = await photo.convertToWebP();
		await writeFile(pth.join(this.photosStaticDirPath, photo.link), buffer);
		return true;
	}*/

	async removeFile(filePath: string): Promise<void> {
		return remove(pth.join(this.staticDirPath, filePath));
	}
}
