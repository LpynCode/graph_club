import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";


export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    appearance: 'ghost' | 'primary';
    children: ReactNode;
}