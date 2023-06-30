import React, {useState} from 'react';
import {AudiosListItemProps} from "./AudiosListItem.props";
import styles from "./AudiosListItem.module.css"
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {setActive, setPause, setPlay} from "../../playerSlice";
import cn from "classnames";
import timeFormat from "../../../../helpers/time.format";
import {addAudio, deleteAudio} from "../../audiosSlice";
import AudiosAddToPlaylist from "../AudioAddToPlaylist/AudiosAddToPlaylist";

const AudiosListItem = ({audio, ...props}: AudiosListItemProps) => {
    const dispatch = useAppDispatch();
    const {active, pause, currentTime} = useAppSelector(state => state.player);
    const {userAudios} = useAppSelector((state) => state.audios);
    const [isHover, setIsHover] = useState<boolean>(false);

    const onClick = () => {
        if(pause && active?.id === audio.id) {
            dispatch(setPlay());
        } else if(active?.id !== audio.id) {
            dispatch(setActive(audio))
            dispatch(setPlay())
        } else {
            dispatch(setPause());
        }
    }

    const onDeleteClick = (e: MouseEvent) => {
        e.stopPropagation();
        dispatch(deleteAudio(audio.id));
    }

    const onHover = (e: React.MouseEvent) => {
        setIsHover(true)
    }

    const onAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(addAudio(audio.id))
    }

    return (
        <div {...props} className={cn(styles.card, {[styles.active]: active?.id === audio.id})} onMouseOver={onHover} onMouseOut={() => setIsHover(false)} onClick={onClick}>
            <div>{audio.name}</div>
            {active?.id === audio.id && !isHover &&
                <div>
                    {timeFormat(currentTime)}
                </div>
            }
            {isHover && <div className={styles.buttons}>
                {
                    userAudios.find(el => el.id === audio.id) ?
                        <button appearance={'primary'} className={cn(styles.btn, styles.delete_btn)}
                                onClick={onDeleteClick}>
                            <img src={'/public/plus.svg'}/>
                        </button>
                        :
                        <button appearance={'primary'} className={cn(styles.btn, styles.add_btn)} onClick={onAddClick}>
                            <img src={'/public/plus.svg'}/>
                        </button>

                }
                <AudiosAddToPlaylist/>

            </div>
            }
        </div>
    );
};

export default AudiosListItem;