import { ILoggerService } from './logger.service.interface';
import { ILogObj, Logger } from 'tslog';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILoggerService {
	public logger: Logger<ILogObj>;
	constructor() {
		this.logger = new Logger({
			hideLogPositionForProduction: true,
		});
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	info(message: string): void {
		this.logger.info(message);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
