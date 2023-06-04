"use client";

import PlaylistMeta from "@/components/atoms/playlist-meta";
import PlaylistHeader from "@/components/molecules/playlist-header";
import { AppAudioContext } from "@/contexts/app-audio-context";
import { AppAudioContextValues } from "@/ts/interfaces";
import { useParams } from 'next/navigation';
import { useContext } from "react";

const PlaylistPage: React.FC = () => {

    const { playlistsArray } = useContext(AppAudioContext) as AppAudioContextValues
    const {id} = useParams()

    const targetPlaylist = playlistsArray.find((playlist) => playlist.id === id)

    return (
        <div className="grow">
            <PlaylistHeader
                title={targetPlaylist?.title}
                coverImgPath={targetPlaylist?.coverImgPath}
                creationDate={targetPlaylist?.creationDate}
                songsAmount={targetPlaylist?.songs.length}
                id={targetPlaylist?.id}
            />
        </div>
    )
}

export default PlaylistPage