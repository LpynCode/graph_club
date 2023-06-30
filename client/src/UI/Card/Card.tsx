import React from 'react';
import {CardProps} from "./Card.props";
import cn from "classnames";
import styles from "./Card.module.css";

const Card = ({appearance, children, className, ...props}: CardProps) => {
    return (
        <div
            className={cn(styles.card, className, {
                [styles.primary]: appearance == 'primary',
                [styles.ghost]: appearance == 'ghost',
            })}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;