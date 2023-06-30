import React, {useEffect, useState} from 'react';
import AudiosList from "../AudiosList/AudiosList";
import PlaylistsList from "../PlaylistsList/PlaylistsList";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import AudioCreateItem from "../AudioCreateItem/AudioCreateItem";
import styles from "./AudiosUserInfo.module.css";
import Input from "../../../../UI/Input/Input";
import {AudiosUserInfoProps} from "./AudiosUserInfo.props";
import {findByName} from "../../audiosSlice";

const AudiosUserInfo = ({myPage, ...props}: AudiosUserInfoProps) => {
    const {audios, userAudios, playlists} = useAppSelector((state) => state.audios);
    const [query, setQuery] = useState<string>('');
    const [search,  setSearch] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(query != '') {
            setSearch(true)
            dispatch(findByName(query));
        } else {
            setSearch(false)
        }
    }, [query])


    const onChange = (e) => {
        setQuery(e.target.value);
    }

    const reset = () => {
        setQuery('');
    }

    return (
        <div className={styles.block} {...props}>
            {myPage && <div className={styles.header}>
                <div className={styles.search_panel}>
                    <Input type={'text'} value={query} placeholder={'Поиск'} className={styles.search_input} onChange={onChange}/>
                        {search &&
                            <button className={styles.reset_btn} onClick={reset}>
                                <img src={'/public/plus.svg'} />
                            </button>
                        }

                </div>
                <AudioCreateItem />
            </div>}
            {search && <AudiosList audios={audios}/>}
            { !search && <>
                <AudiosList audios={myPage ? userAudios : audios} className={styles.audios_list}/>
                <PlaylistsList playlists={playlists} style={{marginTop: '20px'}}/></>
            }

        </div>
    );
};

export default AudiosUserInfo;