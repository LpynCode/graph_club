import React, {Fragment, useRef, useState} from 'react';
import { useAppSelector} from "../../../../hooks/redux";
import styles from "./AudiosAddToPlaylist.module.css"
import {Button} from "../../../../UI/Button/Button";
import cn from "classnames";

const AudiosAddToPlaylist = () => {
    const {playlists} = useAppSelector(state => state.audios)
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onHover = (e: React.MouseEvent) => {
        setIsOpen(true);
    }

    const onMouseOut = (e: React.MouseEvent) => {
        setIsOpen(false);
    }


    return (
        <div onMouseOut={onMouseOut}>
            <button onMouseOver={onHover} className={styles.dots_btn}>
                <img src={'/public/dots-1.svg'} width={'10px'}/>
            </button>
            <div onMouseOver={onHover} onMouseOut={onMouseOut} className={isOpen ? styles.opened : styles.list} >
                Добавить в плейлист
                {playlists.map((playlist) => (
                    <Button key={playlist.id} appearance={'primary'}> {playlist.name} </Button>
                ))}
            </div>
        </div>
    );
};

export default AudiosAddToPlaylist;