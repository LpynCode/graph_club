import { PhotosModel } from '@prisma/client';
import { PhotoEntity } from '../enteties/photo.entity';

export interface IPhotosRepository {
	addPhoto(data: PhotoEntity): Promise<PhotosModel | null>;
	addAvatar(data: PhotoEntity): Promise<PhotosModel | null>;
	getPhotosByAuthorId(authorId: number): Promise<PhotosModel[]>;
	removePhoto(photoId: number): Promise<PhotosModel>;
	getPhotoById(photoId: number): Promise<PhotosModel | null>;
}
