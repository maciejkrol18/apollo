import { AppAudioContext } from "@/contexts/app-audio-context";
import { AppAudioContextValues, PlaylistObject, PlaylistSong } from "@/ts/interfaces";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"
import { useContext, useCallback } from "react";
import AudioWaves from "./audio-waves";
import { PauseIcon, Play } from "lucide-react";

interface PlaylistEntryProps {
    song: PlaylistSong;
    playlist: PlaylistObject;
    idx: number;
}

const PlaylistEntry: React.FC<PlaylistEntryProps> = ({song, playlist, idx}) => {

    const {
        togglePlayback, isAudioPlaying, currentSong, setCurrentSong, setCurrentPlaylist
    } = useContext(AppAudioContext) as AppAudioContextValues

    dayjs.extend(duration)
    const formattedDateAdded = dayjs(song.dateAdded).format('DD.MM.YYYY')
    const formattedSeconds = dayjs.duration(song.lengthInSeconds, 'seconds').format('mm:ss')

    const handlePlayClick = useCallback(() => {
        if (song === currentSong) {
            togglePlayback()
        } else {
            setCurrentSong(song)
            setCurrentPlaylist(playlist)
        }
    },[currentSong,song,playlist])

    return (
        <div 
            className="hover:bg-playlist-entry-highlight rounded-md grid grid-cols-table-row" 
            onDoubleClick={() => handlePlayClick()}
        >
            <div className="p-2">
                <div className="group">
                    {currentSong === song && isAudioPlaying ?
                        <AudioWaves className="group-hover:hidden"/>
                        :
                        currentSong === song && !isAudioPlaying ?
                        <p className="text-brand group-hover:hidden">{idx+1}</p>
                        :
                        <p className="group-hover:hidden">{idx+1}</p>
                    }
                    <button className="hidden group-hover:block" onClick={() => handlePlayClick()}>
                        {isAudioPlaying && currentSong === song ?
                            <PauseIcon/> : <Play/>
                        }
                    </button>
                </div>
            </div>
            <div className="p-2 text-ellipsis overflow-hidden whitespace-nowrap">
                {
                    currentSong === song ?
                    <p className="text-brand">{song.title}</p>
                    :
                    <p>{song.title}</p>
                }
            </div>
            <div className="p-2">{formattedDateAdded}</div>
            <div className="p-2">{formattedSeconds}</div>
        </div>
    )
}

export default PlaylistEntry