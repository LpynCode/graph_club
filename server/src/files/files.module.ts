import { ContainerModule } from 'inversify';

import { TYPES } from '../types';
import { IFilesService } from './interfaces/files.service.interface';
import { FilesService } from './files.service';

export const FilesModule = new ContainerModule((bind) => {
	bind<IFilesService>(TYPES.FilesService).to(FilesService).inSingletonScope();
});
