import {DetailedHTMLProps, HTMLAttributes} from "react";


export interface AvatarProps extends DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    size: string;
    link: string | undefined;
}