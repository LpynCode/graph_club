import {DetailedHTMLProps, HTMLAttributes} from "react";
import {Audio} from "../../models/audio.interface";

export interface AudiosListItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    audio: Audio;
}