import { IsString } from 'class-validator';

export class ChangeProfileDto {
	@IsString({ message: 'Некоректное имя' })
	readonly displayName: string;
}
