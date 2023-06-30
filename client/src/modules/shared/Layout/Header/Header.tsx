import React from 'react';
import styles from './Header.module.css';
import {HeaderProps} from "./Header.props";
import cn from "classnames";
import {Button} from "../../../../UI/Button/Button";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {logout} from "../../../auth/authSlice";
import Avatar from "../../../../UI/Avatar/Avatar";
import {Link} from "react-router-dom";

const Header = ({className, ...props}: HeaderProps) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state.auth)
    return (
        <header className={cn(className, styles.header)} {...props}>
            <Link to={'/'} className={styles.logo}>
                <img src='http://localhost:5173/public/logo.png' alt='logo' height='40px' />
                <h2>GraphClub</h2>
            </Link>
            <div></div>
            <Link to={`/${user.id}`} style={{display: 'flex'}}>
                <Avatar size={"40px"} link={user.avatar?.photo.link}/>
            </Link>
            <Button appearance={'ghost'} onClick={() => dispatch(logout())}>Logout</Button>
        </header>
    );
};

export default Header;