import { StaticImageData } from "next/image";

export interface AppAudioContextValues {
    playlistsArray: Array<PlaylistObject>;
    setPlaylistsArray: React.Dispatch<React.SetStateAction<Array<PlaylistObject>>>
}

export interface PlaylistSong {
    title: string;
    convertedFilepath: string;
    lengthInSeconds: number;
    dateAdded: Date;
    id: string;
}

export interface PlaylistObject {
    title: string;
    id: string;
    creationDate: Date;
    coverImgPath: string;
    userSongOrder: Array<string>
    songs: Array<PlaylistSong>;
}