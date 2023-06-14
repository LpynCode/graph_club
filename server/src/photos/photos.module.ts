import { ContainerModule } from 'inversify';
import { TYPES } from '../types';
import { PhotosController } from './photos.controller';
import { IPhotosController } from './interfaces/photos.controller.interface';
import { PhotosRepository } from './photos.repository';
import { IPhotosService } from './interfaces/photos.service.interface';
import { IPhotosRepository } from './interfaces/photos.repository.interface';
import { PhotosService } from './photos.service';

export const PhotosModule = new ContainerModule((bind) => {
	bind<IPhotosController>(TYPES.PhotosController).to(PhotosController);
	bind<IPhotosRepository>(TYPES.PhotosRepository).to(PhotosRepository);
	bind<IPhotosService>(TYPES.PhotosService).to(PhotosService);
});
