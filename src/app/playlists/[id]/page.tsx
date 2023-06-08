"use client";

import PlaylistEntry from "@/components/atoms/playlist-entry";
import PlaylistHeader from "@/components/molecules/playlist-header";
import PlaylistSongs from "@/components/molecules/playlist-songs";
import { AppAudioContext } from "@/contexts/app-audio-context";
import { AppAudioContextValues } from "@/ts/interfaces";
import { useParams } from 'next/navigation';
import { useContext, useState, useEffect } from "react";

const PlaylistPage: React.FC = () => {

    const { playlistsArray, setPlaylistsArray } = useContext(AppAudioContext) as AppAudioContextValues
    const {id} = useParams()

    const [targetPlaylist, setTargetPlaylist] = useState(playlistsArray.find((playlist) => playlist.id === id))

    useEffect(() => {
        setTargetPlaylist(playlistsArray.find((playlist) => playlist.id === id))
    },[playlistsArray])

    return (
        <div className="grow">
            <PlaylistHeader
                targetPlaylist={targetPlaylist}
                playlistsArray={playlistsArray}
                setPlaylistsArray={setPlaylistsArray}
            />
            <div className="flex flex-col mt-10">
                <PlaylistSongs targetPlaylist={targetPlaylist}/>
            </div>
        </div>
    )
}

export default PlaylistPage