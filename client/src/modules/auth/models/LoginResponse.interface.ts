import {Jwt} from "./Jwt.interface";
import {ILoginUser} from "./LoginUser.interface";
import {IDisplayUser} from "./DisplayUser.interface";


export interface ILoginResponse extends Jwt{
    user: IDisplayUser
}