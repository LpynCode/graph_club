import { IAuthController } from './interfaces/auth.controller.interface';
import { TYPES } from '../types';
import { AuthController } from './auth.controller';
import { IAuthService } from './interfaces/auth.service.interface';
import { AuthService } from './auth.service';
import { ContainerModule } from 'inversify';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export const AuthModule = new ContainerModule((bind) => {
	bind<IAuthController>(TYPES.AuthController).to(AuthController);
	bind<IAuthService>(TYPES.AuthService).to(AuthService);
	bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
});
