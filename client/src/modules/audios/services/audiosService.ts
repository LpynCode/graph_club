import axios from "axios";
import {CreatePlaylist} from "../models/CreatePlaylist";
import {CreateAudioForm} from "../models/CreateAudioForm.interface";
import {CreateAudio} from "../models/CreateAudio";
import $api from "../../../http";

const getPlaylistInfo = async (playlistId: number) => {
    return await $api.get(`/playlist/${playlistId}`);
}

const getAudiosByUserId = async (userId: number) => {
    return await $api.get(`/audios/user/${userId}`);
}

const getUserPlaylists = async (userId: number) => {
    return await $api.get(`/playlist/user/${userId}`);
}

const createPlaylist = async (data: CreatePlaylist) => {
    return await $api.post(`/playlist/create`, data);
}

const deletePlaylist = async (playlistId: number) => {
    return await $api.delete(`/playlist/${playlistId}`);
}

const createAudio = async (data: CreateAudio) => {
    return await $api.post(`/audios/create`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

const deleteAudio = async (audioId: number) => {
    return await $api.delete(`/audios/${audioId}`);
}

const addAudio = async (audioId: number) => {
    return await $api.get(`/audios/addToMy/${audioId}`);
}

const getMyAudios = async () => {
    return await $api.get(`/audios/myAudios`);
}

const findAudioByName = async (name: string) => {
    return await $api.get(`/audios/find/${name}`);
}



const audiosService = {
    getAudiosByUserId,
    getUserPlaylists,
    createPlaylist,
    deletePlaylist,
    getPlaylistInfo,
    createAudio,
    deleteAudio,
    addAudio,
    getMyAudios,
    findAudioByName
}

export default audiosService