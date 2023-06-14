"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostDto = exports.changeProfileDto = exports.userLoginDto = exports.userRegisterDto = void 0;
exports.userRegisterDto = {
    email: 'graph@graph.com',
    displayName: 'graph',
    password: 'graph',
};
exports.userLoginDto = {
    email: exports.userRegisterDto.email,
    password: exports.userRegisterDto.password,
};
exports.changeProfileDto = {
    displayName: 'graph1',
};
exports.createPostDto = {
    title: 'Hello from graph',
    description: 'This is test post without description',
};
//# sourceMappingURL=test.constants.js.map