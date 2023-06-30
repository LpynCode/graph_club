import axios from "axios";
import $api from "../../../http";


const getAllUsers = async () => {
    const response = await $api.get('/users');
    return response;
}

const getUserById = async (userId: number) => {
    const response = await $api.get(`/users/${userId}`);
    return response;
}

const usersService = {
    getAllUsers,
    getUserById
}

export default usersService