import React from 'react';
import styles from './Sidebar.module.css';
import cn from "classnames";
import {SidebarProps} from "./Sidebar.props";
import NavLink from "../../../../UI/NavLink/NavLink";

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
    return (
        <div className={cn(className, styles.sidebar)} {...props}>
            <NavLink to={'/'}>Главная</NavLink>
            <NavLink to={'/users'}>Пользователи</NavLink>
            <NavLink to={'/audios'}>Аудиозаписи</NavLink>
            <NavLink to={'/videos'}>Видеозаписи</NavLink>
        </div>
    );
};

export default Sidebar;