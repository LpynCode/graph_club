import { IUserRepository } from '../user/interfaces/user.repository.interface';

export const UserRepositoryMock: IUserRepository = {
	getUserByID: jest.fn(),
	getUserByEmail: jest.fn(),
	getAllUsers: jest.fn(),
	createUser: jest.fn(),
	changeProfile: jest.fn(),
};
