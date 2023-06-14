"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
const supertest_1 = __importDefault(require("supertest"));
const test_constants_1 = require("./test.constants");
let application;
let token;
let createdUser;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const { app } = yield main_1.boot;
    application = app;
}));
describe('Auth e2e', () => {
    it('/auth/register (POST) - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(application.app).post('/auth/register').send(test_constants_1.userRegisterDto);
        createdUser = res.body;
        expect(createdUser.email).toBe(test_constants_1.userRegisterDto.email);
        expect(createdUser.displayName).toBe(test_constants_1.userRegisterDto.displayName);
    }));
    it('/auth/login (POST) - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(application.app).post('/auth/login').send(test_constants_1.userLoginDto);
        token = res.body.token;
        expect(token).not.toBeUndefined();
    }));
    it('/auth/login (POST) - failed', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(application.app)
            .post('/auth/login')
            .send(Object.assign(Object.assign({}, test_constants_1.userLoginDto), { password: '1' }));
        expect(res.status).toEqual(422);
    }));
});
describe('Users e2e', () => {
    it('/users/ (GET) - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(application.app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .send(test_constants_1.changeProfileDto);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].email).toEqual(test_constants_1.userRegisterDto.email);
        expect(res.body[0].displayName).toEqual(test_constants_1.userRegisterDto.displayName);
    }));
    it('/users/:id (GET) - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(application.app)
            .get(`/users/${createdUser.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(test_constants_1.changeProfileDto);
        expect(res.body.email).toEqual(test_constants_1.userRegisterDto.email);
        expect(res.body.displayName).toEqual(test_constants_1.userRegisterDto.displayName);
    }));
    it('/users/update (PUT) - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(application.app)
            .put('/users/update')
            .set('Authorization', `Bearer ${token}`)
            .send(test_constants_1.changeProfileDto);
        expect(res.body.email).toEqual(test_constants_1.userLoginDto.email);
        expect(res.body.displayName).toEqual(test_constants_1.changeProfileDto.displayName);
    }));
});
describe('Posts (e2e)', () => {
    it('/posts/create (POST) - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(application.app)
            .post('/posts/create')
            .set('Authorization', `Bearer ${token}`)
            .send(test_constants_1.createPostDto);
        expect(res.body.title).toEqual(test_constants_1.createPostDto.title);
        expect(res.body.description).toEqual(test_constants_1.createPostDto.description);
    }));
    it('/posts/:id (GET) - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(application.app).get('/posts/1');
        expect(res.body.title).toEqual(test_constants_1.createPostDto.title);
        expect(res.body.description).toEqual(test_constants_1.createPostDto.description);
    }));
    it('/posts (GET) - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(application.app).get('/posts');
        expect(res.body[0].title).toEqual(test_constants_1.createPostDto.title);
        expect(res.body[0].description).toEqual(test_constants_1.createPostDto.description);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    application.close();
}));
//# sourceMappingURL=app.e2e-spec.js.map