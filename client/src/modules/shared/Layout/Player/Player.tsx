import { PlayerProps } from './Player.props';
import styles from './Player.module.css';
import cn from 'classnames';
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {setCurrentTime, setDuration, setPause, setPlay, setVolume} from "../../../audios/playerSlice";
import TrackProgress from "../../../../UI/TrackProgress/TrackProgress";
import timeFormat from "../../../../helpers/time.format";

let audio;

const Player = ({ className, ...props }: PlayerProps): JSX.Element => {
    const {pause, volume, duration, currentTime, active} = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!audio) {
            audio = new Audio();
        } else {
            if(audio.src != "http://localhost:8080/public/" + active?.link) {
                setAudio();
                play();
            }
        }
    }, [active])

    useEffect(() => {
        if(active) {
            if(pause) {
                audio.pause();
            } else {
                audio.play();
            }
        }
    }, [pause])

    const setAudio = () => {
        if (active?.id) {
            audio.src = "http://localhost:8080/public/" + active?.link;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                dispatch(setDuration(audio.duration))
            }
            audio.ontimeupdate = () => {
                dispatch(setCurrentTime(audio.currentTime))
            }
        }
    }

    const play = () => {
        if (!pause) {
            dispatch(setPlay())
            audio.play()
        } else {
            dispatch(setPause())
            audio.pause()
        }
    }


    const onClick = () => {
        if(pause) {
            dispatch(setPlay())
            audio.play()
        } else {
            dispatch(setPause())
            audio.pause()
        }
    }

    const changeVolume = (value) => {
        audio.volume = value / 100;
        dispatch(setVolume(Number(value)))
    }

    const changeCurrentTime = (value) => {
        if( value >= duration) {
            return;
        }
        audio.currentTime = Number(value);
        dispatch(setCurrentTime(Number(value)))
    }

    if(!active) {
        return <></>;
    }

    return (
        <div className={cn(className, styles.footer)} {...props}>
            <button className={styles.play_btn} onClick={onClick}>
                {
                    pause
                        ?
                        <img src={'http://localhost:5173/public/play_btn.svg'} width={"24px"} height={"24px"}/>
                        :
                        <img src={'http://localhost:5173/public/pause_btn.svg'} width={"24px"}/>
                }
            </button>
            <div className={styles.audio_info}>
                <div>{active.name}</div>
                <div>{timeFormat(currentTime)}</div>
                <TrackProgress type={'time'} className={styles.audio_progress} initialValue={currentTime}  onChangeEvent={changeCurrentTime} max={duration}/>
            </div>
            <TrackProgress type={'percent'} initialValue={volume}  onChangeEvent={changeVolume} max={100}/>
        </div>
    );
};

export default Player;
