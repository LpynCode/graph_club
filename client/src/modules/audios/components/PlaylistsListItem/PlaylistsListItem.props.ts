import {DetailedHTMLProps, HTMLAttributes} from "react";
import {Playlist} from "../../models/playlist.interface";

export interface PlaylistsListItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    playlist: Playlist;
}