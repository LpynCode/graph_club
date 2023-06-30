import React, {FunctionComponent, ReactNode} from 'react';
import Header from "./Header/Header";
import {LayoutProps} from "./Layout.props";
import styles from './Layout.module.css';
import Player from "./Player/Player";
import Sidebar from "./Sidebar/Sidebar";

const Layout = ({children}: LayoutProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar}/>
            <main className={styles.body}>
                {children}
            </main>
            <Player className={styles.player}/>
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
};