import {DetailedHTMLProps, HTMLAttributes} from "react";
import {Playlist} from "../../models/playlist.interface";


export interface PlaylistsListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    playlists: Playlist[];
}