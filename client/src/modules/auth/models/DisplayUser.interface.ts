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
    }
}