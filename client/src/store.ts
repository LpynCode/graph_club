import { configureStore } from '@reduxjs/toolkit';

import authReducer from './modules/auth/authSlice';
import usersReducer from './modules/users/usersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;