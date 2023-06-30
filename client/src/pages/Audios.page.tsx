import React, {useEffect} from 'react';
import {withLayout} from "../modules/shared/Layout/Layout";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getAudiosByUserId, getMyAudios, getPlaylistsByUserId} from "../modules/audios/audiosSlice";
import AudiosUserInfo from "../modules/audios/components/AudiosUserInfo/AudiosUserInfo";

const AudiosPage = () => {
    const {userId} = useParams();
    const {user} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if(user.id == userId) {
            dispatch(getMyAudios())
        } else {
            dispatch(getAudiosByUserId(userId))
        }
        dispatch(getPlaylistsByUserId(userId))
    }, [ userId])


    return (
        <AudiosUserInfo myPage={user.id == userId}/>
    );
};

export default withLayout(AudiosPage);