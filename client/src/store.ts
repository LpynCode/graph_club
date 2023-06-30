import { configureStore } from '@reduxjs/toolkit';

import authReducer from './modules/auth/authSlice';
import usersReducer from './modules/users/usersSlice';
import audiosReducer from './modules/audios/audiosSlice'
import playerReducer from "./modules/audios/playerSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        audios: audiosReducer,
        player: playerReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;