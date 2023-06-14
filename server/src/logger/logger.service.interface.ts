export interface ILoggerService {
	logger: unknown;
	info: (message: string) => void;
	warn: (...args: unknown[]) => void;
	error: (...args: unknown[]) => void;
}
