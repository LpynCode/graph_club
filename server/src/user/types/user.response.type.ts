import { UserModel } from '@prisma/client';

export type UserResponse = Omit<UserModel, 'password'>;
