import { ContainerModule } from 'inversify';
import { TYPES } from '../types';
import { AudiosController } from './audios.controller';
import { AudiosRepository } from './audios.repository';
import { AudiosService } from './audios.service';
import { IAudiosService } from './interfaces/audios.service.interface';
import { IAudiosRepository } from './interfaces/audios.repository.interface';

export const AudiosModule = new ContainerModule((bind) => {
	bind<AudiosController>(TYPES.AudiosController).to(AudiosController);
	bind<IAudiosService>(TYPES.AudiosService).to(AudiosService);
	bind<IAudiosRepository>(TYPES.AudiosRepository).to(AudiosRepository);
});
