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
    name: string;
    id: string;
    creationDate: Date;
    coverImgPath: string;
    userSongOrder: Array<string>
    songs: Array<PlaylistSong>;
}