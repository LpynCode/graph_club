import { ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { PrismaService } from './database/prisma.service';
import { ILoggerService } from './logger/logger.service.interface';
import { LoggerService } from './logger/logger.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { App } from './app';

export const AppModule = new ContainerModule((bind: interfaces.Bind) => {
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<ILoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<App>(TYPES.Application).to(App);
});
