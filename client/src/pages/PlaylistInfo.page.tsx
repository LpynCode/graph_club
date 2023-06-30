import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getPlaylistInfo} from "../modules/audios/audiosSlice";
import AudiosList from "../modules/audios/components/AudiosList/AudiosList";
import {withLayout} from "../modules/shared/Layout/Layout";
import PlaylistInfo from "../modules/audios/components/PlaylistInfo/PlaylistInfo";

const PlaylistInfoPage = () => {
    const {playlistId} = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPlaylistInfo(playlistId));
    }, [dispatch, playlistId])

    return (
        <PlaylistInfo/>
    );
};

export default withLayout(PlaylistInfoPage);