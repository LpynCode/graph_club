import React from "react";
import PLaylistsListItem from "../PlaylistsListItem/PLaylistsListItem";
import styles from "./PlaylistsList.module.css"
import PlaylistAddItem from "../PlaylistAddItem/PlaylistAddItem";
import {PlaylistsListProps} from "./PlaylistsList.props";

const PlaylistsList = ({playlists, ...props}: PlaylistsListProps) => {
    return (
        <div className={styles.list} {...props}>
            {playlists && playlists.map((playlist) =>
                <PLaylistsListItem key={playlist.id} playlist={playlist}/>
            )}
            <PlaylistAddItem/>
        </div>
    );
};

export default PlaylistsList;