import React from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import UsersListItem from "../UsersListItem/UsersListItem";
import styles from "./UsersList.module.css"

const UsersList = () => {
    const {users} = useAppSelector((state) => state.users);
    return (
        <div className={styles.list}>
            {users && users.map((user) => <UsersListItem key={user.id} user={user}/>)}
        </div>
    );
};

export default UsersList;