import {ILoginResponse} from "../models/LoginResponse.interface";
import {ILoginUser} from "../models/LoginUser.interface";
import {IRegisterUser} from "../models/RegisterUser.interface";
import {IDisplayUser} from "../models/DisplayUser.interface";
import $api from "../../../http";

const login = async (
    user: ILoginUser
): Promise<ILoginResponse> => {
    const response = await $api.post<ILoginResponse>(
        `/auth/login`,
        user
    );
    response.data.user = {...response.data.user, added_audios: response.data.user.added_audios.map(el => el.audio)};
    if(response.data) {
        localStorage.setItem('token', JSON.stringify({token: response.data.token}));
        localStorage.setItem('user', JSON.stringify( response.data.user ));
    }
    return response.data;
};

const register = async (user: IRegisterUser): Promise<IDisplayUser> => {
    const response = await $api.post<IDisplayUser>(
        `/auth/register`,
        user
    );
    return response.data;
}

const verifyToken = async (token: string) => {
    const response = await $api.post('/auth/verifyToken', token);
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
    register,
    logout,
    verifyToken,
};

export default authService;