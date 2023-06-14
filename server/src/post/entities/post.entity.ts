import { PhotoEntity } from '../../photos/enteties/photo.entity';

export class Post {
	constructor(
		private _title: string,
		private _authorId: number,
		private _description?: string | null,
		private _photoId?: number | null,
	) {}

	get title(): string {
		return this._title;
	}

	get description(): string | undefined | null {
		return this._description;
	}

	get authorId(): number {
		return this._authorId;
	}

	get photoId(): number | undefined | null {
		return this._photoId;
	}

	compareAuthorID(id: number): this | null {
		return this._authorId === id ? this : null;
	}

	updatePost(description: string): Post {
		this._description = description;
		return this;
	}
}
