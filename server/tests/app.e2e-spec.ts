import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';
import { changeProfileDto, createPostDto, userLoginDto, userRegisterDto } from './test.constants';
import { UserModel } from '@prisma/client';

let application: App;
let token: string;
let createdUser: UserModel;
beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Auth e2e', () => {
	it('/auth/register (POST) - success', async () => {
		const res = await request(application.app).post('/auth/register').send(userRegisterDto);
		createdUser = res.body;
		expect(createdUser.email).toBe(userRegisterDto.email);
		expect(createdUser.displayName).toBe(userRegisterDto.displayName);
	});

	it('/auth/login (POST) - success', async () => {
		const res = await request(application.app).post('/auth/login').send(userLoginDto);
		token = res.body.token;
		expect(token).not.toBeUndefined();
	});

	it('/auth/login (POST) - failed', async () => {
		const res = await request(application.app)
			.post('/auth/login')
			.send({ ...userLoginDto, password: '1' });
		expect(res.status).toEqual(422);
	});
});

describe('Users e2e', () => {
	it('/users/ (GET) - success', async () => {
		const res = await request(application.app)
			.get('/users')
			.set('Authorization', `Bearer ${token}`)
			.send(changeProfileDto);
		expect(res.body.length).toEqual(1);
		expect(res.body[0].email).toEqual(userRegisterDto.email);
		expect(res.body[0].displayName).toEqual(userRegisterDto.displayName);
	});

	it('/users/:id (GET) - success', async () => {
		const res = await request(application.app)
			.get(`/users/${createdUser.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(changeProfileDto);
		expect(res.body.email).toEqual(userRegisterDto.email);
		expect(res.body.displayName).toEqual(userRegisterDto.displayName);
	});

	it('/users/update (PUT) - success', async () => {
		const res = await request(application.app)
			.put('/users/update')
			.set('Authorization', `Bearer ${token}`)
			.send(changeProfileDto);
		expect(res.body.email).toEqual(userLoginDto.email);
		expect(res.body.displayName).toEqual(changeProfileDto.displayName);
	});
});

describe('Posts (e2e)', () => {
	it('/posts/create (POST) - success', async () => {
		const res = await request(application.app)
			.post('/posts/create')
			.set('Authorization', `Bearer ${token}`)
			.send(createPostDto);
		expect(res.body.title).toEqual(createPostDto.title);
		expect(res.body.description).toEqual(createPostDto.description);
	});

	it('/posts/:id (GET) - success', async () => {
		const res = await request(application.app).get('/posts/1');
		expect(res.body.title).toEqual(createPostDto.title);
		expect(res.body.description).toEqual(createPostDto.description);
	});

	it('/posts (GET) - success', async () => {
		const res = await request(application.app).get('/posts');
		expect(res.body[0].title).toEqual(createPostDto.title);
		expect(res.body[0].description).toEqual(createPostDto.description);
	});
});

afterAll(async () => {
	application.close();
});
