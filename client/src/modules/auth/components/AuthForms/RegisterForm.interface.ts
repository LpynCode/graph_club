

export interface IRegisterForm {
    displayName: string;
    email: string;
    password: string;
}

export interface IRegisterSentResponse{
    id:number;
    email:string;
}