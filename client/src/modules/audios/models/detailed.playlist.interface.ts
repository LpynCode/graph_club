import {Playlist} from "./playlist.interface";
import {Audio} from "./audio.interface";

export interface DetailedPlaylist extends Playlist{
    audios: [{
        audio: Audio
    }];
}