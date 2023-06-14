import React from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import Avatar from "../../../../UI/Avatar/Avatar";

const UserById = () => {
    const {userById, isLoading} = useAppSelector(state => state.users);
    if(isLoading) {
        return (<></>);
    }
    if(!userById) return(<></>)
    return (
        <div>
            <Avatar size={"100px"} link={userById.avatar?.photo.link}/>
            <div>{userById.displayName}</div>
        </div>
    );
};

export default UserById;