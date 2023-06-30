import React, {ReactNode} from 'react';
import styles from './AuthLayout.module.css';
import Player from "../../../shared/Layout/Player/Player";

const AuthLayout = ({children}: {children: ReactNode }) => {
    return (
        <main className={styles.main}>
            <div className={styles.layout}>
                <h2>GraphShop</h2>
                <img src='logo.png' alt='logo' height='220px' style={{display:"grid"}}/>
                {children}
            </div>

        </main>
    );
};

export default AuthLayout;