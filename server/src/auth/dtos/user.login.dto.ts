import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Некоретный email' })
	readonly email: string;

	@IsString()
	readonly password: string;
}
