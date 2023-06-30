import React from 'react';
import styles from "./PLaylistInfo.module.css";
import AudiosList from "../AudiosList/AudiosList";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {Button} from "../../../../UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {deletePlaylist} from "../../audiosSlice";
import AudioCreateItem from "../AudioCreateItem/AudioCreateItem";

const PlaylistInfo = () => {
    const {isLoading, playlistInfo} = useAppSelector((state) => state.audios);
    const {user} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onDelete = (playlistId: number) => {
        dispatch(deletePlaylist(playlistId))
        navigate(`/audios/${user.id}`);
    }

    return (
        <div className={styles.playlist_info}>
            <h3>{playlistInfo?.name}</h3>

            <div className={styles.main}>
                <AudiosList audios={playlistInfo?.audios.map(el => el.audio)}/>
                {playlistInfo?.authorId === user.id &&
                    <div className={styles.buttons}>
                        <Button  appearance={'primary'} onClick={() => onDelete(playlistInfo?.id)}>
                            Удалить плейлист
                        </Button>
                    </div>
                }
            </div>

        </div>
    );
};

export default PlaylistInfo;