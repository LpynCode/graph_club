import { Container } from 'inversify';
import { IAuthService } from './interfaces/auth.service.interface';
import { IConfigService } from '../config/config.service.interface';
import { IUserRepository } from '../user/interfaces/user.repository.interface';
import { TYPES } from '../types';
import { UserRepositoryMock } from '../__mocks__/user.repository.mock';
import { ConfigServiceMock } from '../__mocks__/config.service.mock';
import { AuthService } from './auth.service';
import { Role, UserModel } from '@prisma/client';
import { UserRegisterDto } from './dtos/user.register.dto';
import { UserLoginDto } from './dtos/user.login.dto';
import { User } from '../user/entities/user.entity';

const container = new Container();
let authService: IAuthService;
let configService: IConfigService;
let userRepository: IUserRepository;

beforeAll(() => {
	container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
	container.bind<IUserRepository>(TYPES.UserRepository).toConstantValue(UserRepositoryMock);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);

	authService = container.get<IAuthService>(TYPES.AuthService);
	userRepository = container.get<IUserRepository>(TYPES.UserRepository);
	configService = container.get<IConfigService>(TYPES.ConfigService);
});

const dataForRegister: UserRegisterDto = {
	email: 'graph@gmail.com',
	displayName: 'graph',
	password: 'graph',
};

const dataForLogin: UserLoginDto = {
	email: dataForRegister.email,
	password: dataForRegister.password,
};

let registeredUser: UserModel | null;

describe('AuthService', () => {
	it('register', async () => {
		userRepository.getUserByEmail = jest.fn().mockImplementationOnce((email: string) => null);
		userRepository.createUser = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				id: 1,
				email: user.email,
				displayName: user.displayName,
				role: Role.USER,
				password: user.password,
			}),
		);
		registeredUser = await authService.register(dataForRegister);
		expect(registeredUser?.id).toEqual(1);
		expect(registeredUser?.email).toEqual(dataForRegister.email);
		expect(registeredUser?.password).not.toEqual(dataForRegister.password);
	});

	it('login', async () => {
		userRepository.getUserByEmail = jest
			.fn()
			.mockImplementationOnce((email: string) => registeredUser);
		configService.get = jest.fn().mockReturnValueOnce('my_secret');
		const res = await authService.login(dataForLogin);
		expect(res).toHaveProperty('token');
	});

	it('login - incorrect password', async () => {
		userRepository.getUserByEmail = jest
			.fn()
			.mockImplementationOnce((email: string) => registeredUser);
		configService.get = jest.fn().mockReturnValueOnce('my_secret');
		const res = await authService.login({ ...dataForLogin, password: 'graph1' });
		expect(res).toBeNull();
	});

	it('login - non existed user', async () => {
		userRepository.getUserByEmail = jest.fn().mockImplementationOnce((email: string) => null);
		configService.get = jest.fn().mockReturnValueOnce('my_secret');
		const res = await authService.login({ ...dataForLogin, password: 'graph1' });
		expect(res).toBeNull();
	});
});
