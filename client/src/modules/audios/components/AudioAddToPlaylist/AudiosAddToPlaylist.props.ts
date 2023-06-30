import {DetailedHTMLProps, HTMLAttributes} from "react";
import {Playlist} from "../../models/playlist.interface";


export interface AudiosAddToPlaylistProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    playlists: Playlist[];
}