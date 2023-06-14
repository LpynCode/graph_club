import { IsEmail, IsString, ValidationArguments } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Некоретный email' })
	readonly email: string;

	@IsString()
	readonly displayName: string;

	@IsString()
	readonly password: string;
}
