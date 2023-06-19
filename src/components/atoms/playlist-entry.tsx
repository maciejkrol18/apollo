import { AppAudioContext } from "@/contexts/app-audio-context";
import { AppAudioContextValues, PlaylistObject, PlaylistSong } from "@/ts/interfaces";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"
import { useContext } from "react";
import AudioWaves from "./audio-waves";

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

    const handlePlayClick = () => {
        if (song === currentSong) {
            togglePlayback()
        } else {
            setCurrentSong(song)
            setCurrentPlaylist(playlist)
        }
    }

    return (
        <tr className="px-3 hover:bg-playlist-entry-highlight">
            <td className="py-2">
                <div className="group">
                    {
                        currentSong === song && isAudioPlaying ?
                        <AudioWaves className="group-hover:hidden"/>
                        :
                        currentSong === song && !isAudioPlaying ?
                        <p className="text-brand group-hover:hidden">{idx+1}</p>
                        :
                        <p className="group-hover:hidden">{idx+1}</p>
                    }
                    <button className="hidden group-hover:block" onClick={() => handlePlayClick()}>
                        {isAudioPlaying && currentSong === song ? "Pause" : "Play"}
                    </button>
                </div>
            </td>
            <td className="py-2">
                {
                    currentSong === song ?
                    <p className="text-brand">{song.title}</p>
                    :
                    <p>{song.title}</p>
                }
            </td>
            <td className="py-2">{formattedDateAdded}</td>
            <td className="py-2">{formattedSeconds}</td>
        </tr>
    )
}

export default PlaylistEntry