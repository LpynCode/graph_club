declare namespace Express {
	import { AuthJwtPayload } from '../src/auth/dtos/auth.jwt.payload';

	export interface Request {
		user: AuthJwtPayload;
	}
}
