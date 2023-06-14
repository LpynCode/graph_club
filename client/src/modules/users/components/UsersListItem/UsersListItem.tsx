import React from 'react';
import styles from './UsersListItem.module.css';
import {UsersListItemProps} from "./UsersListItem.props";
import Avatar from "../../../../UI/Avatar/Avatar";
import {Link} from "react-router-dom";

const UsersListItem = ({user, ...props}: UsersListItemProps) => {
    return (
        <div className={styles.card} {...props}>
            <Link to={`/${user.id}`}>
                <Avatar size={'80px'} link={user?.avatar?.photo.link} className={styles.avatar}/>
            </Link>
            <div className={styles.user_info}>
                <Link to={`/${user.id}`} style={{position: 'absolute'}}>
                    {user.displayName}
                </Link>
            </div>

        </div>
    );
};

export default UsersListItem;