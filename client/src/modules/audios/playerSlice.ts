import {createSlice} from "@reduxjs/toolkit";
import {Audio} from "./models/audio.interface";

interface PlayerState {
    currentTime: number;
    duration: number;
    volume: number;
    pause: boolean;
    active: Audio | null;
}

const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 100,
    pause: true
}


const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlay: (state) => {
            state.pause = false;
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
        setPause: (state) => {
            state.pause = true
        },
        setActive: (state, action) => {
            state.active = action.payload;
            state.duration = 0;
            state.currentTime = 0;
        }
    }
})

export const {setPlay, setCurrentTime, setVolume, setPause, setDuration, setActive} = playerSlice.actions

export default playerSlice.reducer