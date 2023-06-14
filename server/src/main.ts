import { App } from './app';
import { Container } from 'inversify';
import { TYPES } from './types';

import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { FilesModule } from './files/files.module';
import { PhotosModule } from './photos/photos.module';
import { PlaylistModule } from './playlist/playlist.module';
import { AudiosModule } from './audios/audios.module';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(
		AppModule,
		AuthModule,
		UserModule,
		PostModule,
		FilesModule,
		PhotosModule,
		PlaylistModule,
		AudiosModule,
	);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { appContainer, app };
}

export const boot = bootstrap();
