import axios from "axios";


const getAllUsers = async () => {
    const response = await axios.get('http://localhost:8080/users');
    return response;
}

const getUserById = async (userId: number) => {
    const response = await axios.get(`http://localhost:8080/users/${userId}`);
    return response;
}

const usersService = {
    getAllUsers,
    getUserById
}

export default usersService