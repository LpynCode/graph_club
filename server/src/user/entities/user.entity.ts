import { compare, hash } from 'bcryptjs';
import { Role } from '@prisma/client';

export class User {
	private _password: string;
	constructor(
		private _displayName: string,
		private readonly _email: string,
		private readonly _role: Role,
		_passwordHash = '',
	) {
		this._password = _passwordHash;
	}

	get email(): string {
		return this._email;
	}

	get displayName(): string {
		return this._displayName;
	}

	get password(): string {
		return this._password;
	}

	public changeProfile(displayName: string): User {
		this._displayName = displayName;
		return this;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password);
	}
}
