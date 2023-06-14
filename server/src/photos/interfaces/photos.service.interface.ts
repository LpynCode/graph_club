import { UploadedFile } from 'express-fileupload';
import { PhotosModel } from '@prisma/client';
import { PhotoEntity } from '../enteties/photo.entity';

export interface IPhotosService {
	addPhoto: (authorId: number, photo: UploadedFile) => Promise<PhotosModel | null>;
	changeAvatar: (authorId: number, photo: UploadedFile) => Promise<PhotosModel | null>;
	getPhotosByAuthorId: (authorId: number) => Promise<PhotosModel[]>;
	removePhoto: (photoId: number, authorId: number) => Promise<PhotosModel | null>;
}
