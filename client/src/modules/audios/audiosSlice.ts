import {Audio} from "./models/audio.interface";
import {Playlist} from "./models/playlist.interface";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import audiosService from "./services/audiosService";
import {CreatePlaylist} from "./models/CreatePlaylist";
import {DetailedPlaylist} from "./models/detailed.playlist.interface";
import {CreateAudio} from "./models/CreateAudio";

interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

interface AudiosState extends AsyncState{
    userAudios: Audio[];
    audios: Audio[];
    playlists: Playlist[];
    playlistInfo: DetailedPlaylist | null;
}

const initialState: AudiosState = {
    userAudios: [],
    audios: [],
    playlists: [],
    playlistInfo: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
}

export const getAudiosByUserId = createAsyncThunk(
    'audios/user/id',
    async (userId: number, thunkAPI) => {
        try{
            return await audiosService.getAudiosByUserId(userId);
        } catch(e) {
            return thunkAPI.regectWithValue('UnableToLoadAudiosByUserId')
        }
    }
)

export const getMyAudios = createAsyncThunk(
    'audios/myAudios',
    async (thunkAPI) => {
        try{
            return await audiosService.getMyAudios();
        } catch(e) {
            return thunkAPI.regectWithValue('UnableToLoadAudiosByUserId')
        }
    }
)

export const getPlaylistsByUserId = createAsyncThunk(
    'playlist/userId',
    async (userId: number, thunkAPI) => {
        try{
            return await audiosService.getUserPlaylists(userId);
        } catch(e) {
            return thunkAPI.regectWithValue('Unable to find playlist')
        }
    }
)

export const createPlaylist = createAsyncThunk(
    'playlist/create',
    async (data: CreatePlaylist, thunkAPI) => {
        try {
            return await audiosService.createPlaylist(data);
        } catch(e) {
            return thunkAPI.rejectWithValue('Unable to create playlist');
        }
    }
)

export const deletePlaylist = createAsyncThunk(
    'playlist/delete',
    async (playlistId: number, thunkAPI) => {
        try {
            return await audiosService.deletePlaylist(playlistId);
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка удаления');
        }
    }
)

export const getPlaylistInfo = createAsyncThunk(
    'playlist/:id',
    async (playlistId: number, thunkAPI) => {
        try {
            return await audiosService.getPlaylistInfo(playlistId);
        } catch (e) {
            return thunkAPI.rejectWithValue('Плейлист не найден');
        }
    }
)

export const createAudio = createAsyncThunk(
    'audio/create',
    async (data: CreateAudio, thunkAPI) => {
        try {
            return await audiosService.createAudio(data);
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка создания аудиозаписи');
        }
    }
)

export const deleteAudio = createAsyncThunk(
    'audios/delete',
    async (audioId: number, thunkAPI) => {
        try {
            return await audiosService.deleteAudio(audioId);
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка удаления');
        }
    }
)

export const addAudio = createAsyncThunk(
    'audios/addToMy',
    async (audioId: number, thunkAPI) => {
        try {
            return audiosService.addAudio(audioId);
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка создания');
        }
    }
)

export const findByName = createAsyncThunk(
    'audios/find',
    async(name: string, thunkAPI) => {
        try {
            return audiosService.findAudioByName(name);
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка поиска');
        }
    }
)

export const audiosSlice = createSlice({
    name: 'audios',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPlaylistsByUserId.pending, (state) => {
                state.loading = true
            })
            .addCase(getPlaylistsByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.playlists = action.payload.data
            })
            .addCase(getPlaylistsByUserId.rejected, (state) => {
                state.isLoading = false
                state.isError = true
                state.playlists= [];
            })
            .addCase(getAudiosByUserId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAudiosByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.audios = action.payload.data.map(el => el.audio)
            })
            .addCase(getAudiosByUserId.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.audios= [];
            })
            .addCase(getMyAudios.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMyAudios.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userAudios = action.payload.data.map(el => el.audio)
            })
            .addCase(getMyAudios.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.userAudios= [];
            })
            .addCase(createPlaylist.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.playlists.push(action.payload.data);
            })
            .addCase(createPlaylist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPlaylist.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(deletePlaylist.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.playlists.filter((el) => el.id == action.payload.data.id);
            })
            .addCase(deletePlaylist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePlaylist.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getPlaylistInfo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPlaylistInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.playlistInfo = action.payload.data
            })
            .addCase(getPlaylistInfo.rejected, (state) => {
                state.isLoading = false
                state.isError = true
                state.playlistInfo = null;
            })
            .addCase(createAudio.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAudio.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userAudios.unshift(action.payload.data)
            })
            .addCase(createAudio.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(deleteAudio.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.userAudios = state.userAudios.filter(el => el.id !== action.payload.data.id);
            })
            .addCase(deleteAudio.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAudio.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(addAudio.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.userAudios.unshift(action.payload.data.audio)
            })
            .addCase(addAudio.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAudio.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(findByName.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.audios = action.payload.data;
            })
            .addCase(findByName.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(findByName.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.audios = [];
            })

    }
})

export default audiosSlice.reducer