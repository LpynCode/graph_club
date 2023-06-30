import React from 'react';
import styles from './Sidebar.module.css';
import cn from "classnames";
import {SidebarProps} from "./Sidebar.props";
import NavLink from "../../../../UI/NavLink/NavLink";
import {useAppSelector} from "../../../../hooks/redux";

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
    const {user} = useAppSelector((state) => state.auth)
    return (
        <div className={cn(className, styles.sidebar)} {...props}>
            <NavLink to={'/'}>Главная</NavLink>
            <NavLink to={'/users'}>Пользователи</NavLink>
            <NavLink to={`/audios/${user.id}`}>Аудиозаписи</NavLink>
            <NavLink to={'/videos'}>Видеозаписи</NavLink>
        </div>
    );
};

export default Sidebar;