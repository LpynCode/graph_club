import React, {useEffect, useRef, useState} from 'react';
import {TrackProgressProps} from "./TrackProgress.props";
import styles from "./TrackProgress.module.css"
import cn from "classnames";
import timeFormat from "../../helpers/time.format";

const TrackProgress = ({ initialValue, onChangeEvent, max, type, className, ...props}: TrackProgressProps) => {
    const [isDown, setIsDown] = useState<boolean>(false);
    const [value, setValue] = useState<number>(Math.ceil(initialValue/max*100));
    const [hintValue, setHintValue] = useState<number>(value);
    const [active, setActive] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if(!active) {
            setValue(initialValue/max*100)
        }
    }, [initialValue])

    useEffect(() => {
        const handleUp = (e) => {
            setIsDown(false);
            setActive(false);
            onChangeEvent(countValue(e.clientX)/100*max)
            setValue(countValue(e.clientX))
        };
        const handleMove = (e: MouseEvent) => {
            setValue(countValue(e.clientX))
            if(type=='percent') {
                onChangeEvent(countValue(e.clientX)/100*max)
            }
            setActive(true)
        }
        if(isDown) {
            window.addEventListener('mouseup', handleUp);
            window.addEventListener('mousemove', handleMove);
        }
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp)
        }
    }, [isDown])



    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setHintValue(x => computeState(x, e));
        }
        if(hover || active) {
            window.addEventListener('mousemove', handleMove);
        }
        return () => {
            window.removeEventListener('mousemove', handleMove);
        }
    }, [hover, active])



    const countValue = (value: number) => {
        let pos = (value - ref.current?.offsetLeft)/ref.current?.clientWidth*100;
        if(pos < 0) {
            pos = 0;
        }
        if(pos > 100) {
            pos = 100;
        }
        return pos;
    }

    const computeState = (x: number, e: MouseEvent) => {
        if(!ref.current) {
            return 0;
        }
        let pos: number;
        if('movementX' in e) {
            return countValue(e.clientX);
        }
        return x;
    }

    const onBarMouseDown = (e) => {
        setIsDown(true)
        setValue(countValue(e.clientX))
    }

    const onBarHover = (e) => {
        setHintValue(countValue(e.clientX))
        setHover(true)
    }


    return (
        <div className={cn( className, styles.slider, {[styles.active]: active || hover})} ref={ref} onMouseDown={onBarMouseDown} onMouseOver={onBarHover} onMouseOut={() => setHover(false)} {...props}>
            <div className={styles.slide} >
                <div className={styles.amount} style={{width: `${value}%`}}></div>
                <div style={ {left: `${value}%`}} className={styles.handler}></div>
            </div>
            <div style={{left: `${hintValue}%`}} className={styles.hint}>{type == 'time' ? timeFormat(hintValue/100*max) : `${Math.ceil(hintValue)}%`} </div>
        </div>
    );
};

export default TrackProgress;