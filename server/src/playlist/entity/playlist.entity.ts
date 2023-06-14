export class Playlist {
	constructor(
		private readonly _authorId: number,
		private readonly _name: string,
		private readonly _description?: string,
	) {}

	get authorId(): number {
		return this._authorId;
	}

	get name(): string {
		return this._name;
	}

	get description(): string | undefined {
		return this._description;
	}
}
