import React from 'react';
import {PlaylistsListItemProps} from "./PlaylistsListItem.props";
import styles from "./PlaylistsListItem.module.css";
import Card from "../../../../UI/Card/Card";
import {Link} from "react-router-dom";

const PLaylistsListItem = ({playlist, ...props}: PlaylistsListItemProps) => {
    return (
        <Link to={`http://localhost:5173/playlist/${playlist.id}`} style={{textDecoration: 'none'}}>
            <Card {...props} className={styles.card} appearance={'primary'}>
                {playlist.name}
            </Card>
        </Link>
    );
};

export default PLaylistsListItem;