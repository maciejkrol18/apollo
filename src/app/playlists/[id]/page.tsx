"use client";

import PlaylistMeta from "@/components/atoms/playlist-meta";
import PlaylistHeader from "@/components/molecules/playlist-header";
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
                title={targetPlaylist?.title}
                coverImgPath={targetPlaylist?.coverImgPath}
                creationDate={targetPlaylist?.creationDate}
                songsAmount={targetPlaylist?.songs.length}
                id={targetPlaylist?.id}
                setPlaylistsArray={setPlaylistsArray}
            />
            <div className="flex flex-col mt-10">
                {
                    targetPlaylist?.songs.map((song) => (
                        <div>
                            <p className="font-bold text-lg">{song.title}</p>
                            <p className="font-light">{song.convertedFilepath}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PlaylistPage