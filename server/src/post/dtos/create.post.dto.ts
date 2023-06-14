import { IsString, Length } from 'class-validator';

export class CreatePostDto {
	@Length(5, 255)
	@IsString({ message: 'Заголовок должен быть строкой' })
	title: string;

	@IsString({ message: 'Описание должно быть строкой' })
	description?: string;
}
