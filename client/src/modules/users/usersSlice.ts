import {IDisplayUser} from "../auth/models/DisplayUser.interface";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import usersService from "./services/users.service";


interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

interface UsersState extends AsyncState{
    userById: IDisplayUser | null;
    users: IDisplayUser[];
}

const initialState: UsersState = {
    userById: null,
    users: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
}

export const getUsers = createAsyncThunk('users', async (thunkAPI) => {
    try{
        return await usersService.getAllUsers();
    } catch(e) {
        return thunkAPI.rejectWithValue("Ошибка запроса пользователей");
    }
})

export const getUserById = createAsyncThunk('users/id', async (userId: number, thunkAPI) => {
    try{
        return await usersService.getUserById(userId);
    } catch(e) {
        return thunkAPI.rejectWithValue("Пользователь не найден");
    }
})

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users= action.payload?.data || [];
            })
            .addCase(getUsers.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.users= [];
            })
            .addCase(getUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userById= action.payload?.data || null;
            })
            .addCase(getUserById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.users= null;
            });
    }
})

export default usersSlice.reducer


