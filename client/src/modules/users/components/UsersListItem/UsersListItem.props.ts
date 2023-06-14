import {IDisplayUser} from "../../../auth/models/DisplayUser.interface";
import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface UsersListItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    user: IDisplayUser;
}