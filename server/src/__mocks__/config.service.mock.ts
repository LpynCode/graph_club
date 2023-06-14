import { IConfigService } from '../config/config.service.interface';

export const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};
