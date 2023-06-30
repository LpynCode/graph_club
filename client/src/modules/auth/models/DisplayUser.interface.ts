import {Audio} from "../../audios/models/audio.interface";

export interface IDisplayUser{
    id: number;
    displayName: string;
    email: string;
    avatar?: {
        createdAt: Date,
        photo: {
            id: number,
            link: string
        }
    },
    added_audios: Audio[]
}