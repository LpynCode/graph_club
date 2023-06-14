import { IUserRepository } from './interfaces/user.repository.interface';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUserService } from './interfaces/user.service.interface';
import { ConfigServiceMock } from '../__mocks__/config.service.mock';
import { TYPES } from '../types';
import { UserRepositoryMock } from '../__mocks__/user.repository.mock';
import { UserService } from './user.service';
import { Role, UserModel } from '@prisma/client';
import { ChangeProfileDto } from './dtos/update.profile.dto';

const container = new Container();
let configService: IConfigService;
let userRepository: IUserRepository;
let userService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUserRepository>(TYPES.UserRepository).toConstantValue(UserRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	userRepository = container.get<IUserRepository>(TYPES.UserRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});
const users: Omit<UserModel, 'password'>[] = [
	{ displayName: 'graph', email: 'graph@graph.com', id: 1, role: Role.ADMIN },
	{ displayName: 'graph1', email: 'graph1@graph.com', id: 2, role: Role.USER },
];

describe('UserService', () => {
	it('getAllUsers', async () => {
		userRepository.getAllUsers = jest
			.fn()
			.mockImplementationOnce((): Omit<UserModel, 'password'>[] => users);
		const usersFromService = await userService.getAllUsers();
		for (let i = 0; i < users.length; i++) {
			expect(usersFromService[i]?.displayName).toEqual(users[i].displayName);
			expect(usersFromService[i]?.email).toEqual(users[i].email);
			expect(usersFromService[i]?.id).toEqual(users[i].id);
		}
	});

	it('getUserByID', async () => {
		const findUserId = 1;
		userRepository.getUserByID = jest
			.fn()
			.mockImplementationOnce((): Omit<UserModel, 'password'> => users[0]);
		const user = await userService.getUserByID(findUserId);
		expect(user?.displayName).toEqual(users[0].displayName);
		expect(user?.email).toEqual(users[0].email);
		expect(user?.id).toEqual(users[0].id);
	});

	it('getUserByID - null', async () => {
		const findUserId = 3;
		userRepository.getUserByID = jest.fn().mockReturnValue(null);
		const user = await userService.getUserByID(findUserId);
		expect(user).toBeNull();
	});
});
