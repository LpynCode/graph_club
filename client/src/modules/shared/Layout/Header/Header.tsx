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
    console.log(user)
    return (
        <header className={cn(className, styles.header)} {...props}>
            <Link to={'/'} className={styles.logo}>
                <img src='logo.png' alt='logo' height='40px' />
                <h2>GraphClub</h2>
            </Link>
            <Link to={`/${user.id}`}>
                <Avatar size={"40px"} link={user.avatar?.photo.link}/>
            </Link>
            <Button appearance={'ghost'} onClick={() => dispatch(logout())}>Logout</Button>
        </header>
    );
};

export default Header;