import { AppAudioContext } from "@/contexts/app-audio-context";
import { AppAudioContextValues, PlaylistObject, PlaylistSong } from "@/ts/interfaces";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"
import { useContext } from "react";

interface PlaylistEntryProps {
    song: PlaylistSong;
    playlist: PlaylistObject;
    idx: number;
}

const PlaylistEntry: React.FC<PlaylistEntryProps> = ({song, playlist, idx}) => {

    const {
        togglePlayback, currentSong, setCurrentSong, setCurrentPlaylist
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
        <tr>
            <td className="py-2">
                <button onClick={() => handlePlayClick()}>Play</button>
            </td>
            <td className="py-2">{idx+1}. {song.title}</td>
            <td className="py-2">{formattedDateAdded}</td>
            <td className="py-2">{formattedSeconds}</td>
        </tr>
    )
}

export default PlaylistEntry