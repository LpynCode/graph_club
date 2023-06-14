import * as React from "react";
import {NavLink as BaseNavLink, NavLinkProps} from "react-router-dom";
import styles from './Navlink.module.css';
import {ForwardedRef} from "react";
import cn from "classnames";

export const NavLink = React.forwardRef( ({ className, ...props }: NavLinkProps, ref: ForwardedRef<HTMLAnchorElement>) : JSX.Element=> {
        return (
            <BaseNavLink
                ref={ref}
                {...props}
                className={({isActive} ) => cn(styles.link, className, `${isActive ? styles.active : null}`) }
            />
        );
    }
);

export default NavLink;