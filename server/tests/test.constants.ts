import { UserRegisterDto } from '../src/auth/dtos/user.register.dto';
import { UserLoginDto } from '../src/auth/dtos/user.login.dto';
import { ChangeProfileDto } from '../src/user/dtos/update.profile.dto';
import { CreatePostDto } from '../src/post/dtos/create.post.dto';

export const userRegisterDto: UserRegisterDto = {
	email: 'graph@graph.com',
	displayName: 'graph',
	password: 'graph',
};

export const userLoginDto: UserLoginDto = {
	email: userRegisterDto.email,
	password: userRegisterDto.password,
};

export const changeProfileDto: ChangeProfileDto = {
	displayName: 'graph1',
};

export const createPostDto: CreatePostDto = {
	title: 'Hello from graph',
	description: 'This is test post without description',
};
