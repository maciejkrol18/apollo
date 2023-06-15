export interface AppAudioContextValues {
    playlistsArray: Array<PlaylistObject>;
    setPlaylistsArray: React.Dispatch<React.SetStateAction<Array<PlaylistObject>>>;
    togglePlayback: () => void;
    isAudioPlaying: boolean;
    currentSong: PlaylistSong | null;
    setCurrentSong: React.Dispatch<React.SetStateAction<PlaylistSong | null>>;
    currentPlaylist: PlaylistObject | null;
    setCurrentPlaylist: React.Dispatch<React.SetStateAction<PlaylistObject | null>>;
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