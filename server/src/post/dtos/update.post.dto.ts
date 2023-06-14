import { IsNumber, IsString } from 'class-validator';

export class UpdatePostDto {
	@IsNumber()
	id: number;

	@IsString({ message: 'Описание должно быть строкой' })
	description: string;
}
