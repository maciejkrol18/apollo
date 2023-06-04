"use client";

import { AppAudioContext } from "@/contexts/app-audio-context";
import { AppAudioContextValues } from "@/ts/interfaces";
import { nanoid } from "nanoid";
import { useParams } from 'next/navigation';
import { PlusCircle } from "lucide-react"
import { useContext } from "react";
import PlaylistDefaultCover from "@/assets/default-playlist-cover.png"
import PlaylistBox from "../atoms/playlist-box";

const PlaylistsPanel: React.FC = () => {

    const {id} = useParams()

    const { playlistsArray, setPlaylistsArray } = useContext(AppAudioContext) as AppAudioContextValues

    const createNewPlaylist = () => {
        const randomID = nanoid();
        setPlaylistsArray((prevPlaylists) => {
            return [
                {
                    title: 'My playlist',
                    id: randomID,
                    creationDate: new Date(),
                    coverImgPath: PlaylistDefaultCover.src,
                    userSongOrder: [],
                    songs: []
                },
                ...prevPlaylists
            ]
        })
    }

    return (
        <div className="flex flex-col grow gap-6 bg-[#161617] rounded-2xl p-4">
            <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold leading">Playlists</p>
                <button onClick={() => createNewPlaylist()}>
                    <PlusCircle className="w-6 h-6"/>
                </button>
            </div>
            <div id="playlists" className="flex grow flex-col gap-4">
                {
                    playlistsArray.length > 0 ?
                    playlistsArray.map((playlist,idx) => (
                        <PlaylistBox
                            key={idx}
                            title={playlist.title}
                            coverImgPath={playlist.coverImgPath}
                            songsAmount={playlist.songs.length}
                            id={playlist.id}
                            highlight={id === playlist.id}
                        />
                    ))
                    :
                    <div className="bg-slate-800 flex items-center justify-center rounded-2xl">
                        <em>No playlists to display</em>
                    </div>
                }
            </div>
        </div>
    )
}

export default PlaylistsPanel