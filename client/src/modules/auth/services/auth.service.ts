import {ILoginResponse} from "../models/LoginResponse.interface";
import axios from "axios";
import {ILoginUser} from "../models/LoginUser.interface";

const login = async (
    user: ILoginUser
): Promise<ILoginResponse> => {
    const response = await axios.post<ILoginResponse>(
        `http://localhost:8080/auth/login`,
        user
    );
    if(response.data) {
        localStorage.setItem('token', JSON.stringify({token: response.data.token}));
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

const verifyJwt = async (token: string) => {
    const response = await axios.post('http://localhost:8080/auth/verifyToken', {token});
    if(!response.data) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    return response.data;
};

const logout = async() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

const authService = {
    login,
    /*register,*/
    logout,
    verifyJwt,
};

export default authService;