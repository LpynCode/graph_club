import React from 'react';
import {AvatarProps} from "./Avatar.props";
import styles from "./Avatar.module.css";
import cn from "classnames";

const Avatar = ({link, size, ...props}: AvatarProps) => {
    return (
        <img height={size} width={size} className={cn(styles.avatar, props.className)} src={link ? `http://localhost:8080/public/${link}` : '/public/default.png'}/>
    );
};

export default Avatar;