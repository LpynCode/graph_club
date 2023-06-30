import {DetailedHTMLProps, HTMLAttributes, HTMLProps} from "react";
import {Audio} from "../../models/audio.interface";


export interface AudiosListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    audios:  Audio[];
}