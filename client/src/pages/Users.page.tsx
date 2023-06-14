import React, {useEffect} from 'react';
import {withLayout} from "../modules/shared/Layout/Layout";
import UsersListItem from "../modules/users/components/UsersListItem/UsersListItem";
import {getUsers} from "../modules/users/usersSlice";
import {useAppDispatch} from "../hooks/redux";
import UsersList from "../modules/users/components/UsersList/UsersList";

const UsersPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUsers())
    }, [])
    return (
        <div>
            <UsersList/>
        </div>
    );
};

export default withLayout(UsersPage);