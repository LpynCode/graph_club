import {IsString} from "class-validator";

export class AudiosCreateDto {
	@IsString()
	name: string;
}
