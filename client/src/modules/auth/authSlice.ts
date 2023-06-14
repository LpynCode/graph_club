import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ILoginUser} from "./models/LoginUser.interface";
import authService from "./services/auth.service";
import {Jwt} from "./models/Jwt.interface";
import {IDisplayUser} from "./models/DisplayUser.interface";
import {RootState} from "../../store";

const storedUser: string | null = localStorage.getItem('user');
const user: IDisplayUser | null = storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem('token');
const token: Jwt = storedJwt ? JSON.parse(storedJwt) : null;

const isAuth = !!token;
interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

interface AuthState extends AsyncState {
    token?: Jwt | null;
    user?: IDisplayUser | null;
    isAuthenticated?: boolean;
}

const initialState: AuthState= {
    token: token,
    user: user,
    isAuthenticated: isAuth,
    isLoading: false,
    isSuccess: false,
    isError: false,
};
export const login = createAsyncThunk(
    'auth/login',
    async (user: ILoginUser, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to login');
        }
    }
);

export const verifyJwt = createAsyncThunk(
    'auth/verifyToken',
    async(token: string, thunkAPI) => {
        try {
            return await authService.verifyJwt(token);
        } catch(error) {
            return thunkAPI.rejectWithValue("Jwt wasn't decoded");
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.token = {token : action.payload.token};
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            })
            .addCase(verifyJwt.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isAuthenticated = action.payload;
            })
            .addCase(verifyJwt.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(verifyJwt.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isAuthenticated = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            });
    }
});

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
    return state.auth;
};

export default authSlice.reducer;