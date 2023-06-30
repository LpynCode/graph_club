export class Playlist {
	constructor(
		private readonly _authorId: number,
		private readonly _name: string,
		private readonly _description?: string | null,
	) {}

	get authorId(): number {
		return this._authorId;
	}

	get name(): string {
		return this._name;
	}

	get description(): string | undefined | null {
		return this._description;
	}

	public authorize(userId: number): boolean {
		return this._authorId === userId;
	}
}
