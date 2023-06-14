import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {verifyJwt} from "../../authSlice";

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
    const { isLoading, isSuccess, isAuthenticated, token } = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!token) return;
        dispatch(verifyJwt(token.token));
    }, [token, dispatch])

    if(isLoading) {
        return <></>;
    }
    return isAuthenticated ? page : <Navigate replace to='/login' />;
};

export default PrivateRoute;