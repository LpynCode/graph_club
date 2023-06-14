import { ContainerModule } from 'inversify';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TYPES } from '../types';
import { IUserService } from './interfaces/user.service.interface';
import { IUserController } from './interfaces/user.controller.interface';
import { UserRepository } from './user.repository';
import { IUserRepository } from './interfaces/user.repository.interface';

export const UserModule = new ContainerModule((bind) => {
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
});
