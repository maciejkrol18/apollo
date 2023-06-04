import { StaticImageData } from "next/image";

export interface AppAudioContextValues {
    playlistsArray: Array<PlaylistObject>;
    setPlaylistsArray: React.Dispatch<React.SetStateAction<Array<PlaylistObject>>>
}

export interface PlaylistSong {
    title: string;
    filepath: string;
    id: string;
}

export interface PlaylistObject {
    title: string;
    id: string;
    creationDate: Date;
    coverImgPath: string | StaticImageData;
    userSongOrder: Array<string>
    songs: Array<PlaylistSong>;
}