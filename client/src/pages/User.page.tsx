import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {withLayout} from "../modules/shared/Layout/Layout";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getUserById} from "../modules/users/usersSlice";
import user from "../modules/users/components/UsersListItem/UsersListItem";
import UserById from "../modules/users/components/UserById/UserById";

const UserPage = () => {
    const {userId} = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUserById(userId));
    }, [userId])
    return (
        <div>
            <UserById/>
        </div>
    );
};

export default withLayout(UserPage);