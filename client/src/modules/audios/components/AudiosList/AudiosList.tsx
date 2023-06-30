import React from 'react';
import AudiosListItem from "../AudliosListItem/AudiosListItem";
import styles from "./AudiosList.module.css"
import {AudiosListProps} from "./AudiosList.props";
import cn from "classnames";

const AudiosList = ({audios, className, ...props}: AudiosListProps) => {
    return (
        <div className={cn(className, styles.list)} {...props}>
            {audios && audios.map((audio) => <AudiosListItem key={audio.id} audio={audio}/>)}

        </div>
    );
};

export default AudiosList;