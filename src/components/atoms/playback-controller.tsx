import { AppAudioContext } from "@/contexts/app-audio-context"
import { AppAudioContextValues } from "@/ts/interfaces"
import { SkipBack, Pause, PlayIcon, SkipForward } from "lucide-react"
import { useContext } from "react"

const PlaybackController: React.FC = () => {

    const {
        currentSong, setCurrentSong, 
        currentPlaylist, 
        togglePlayback, 
        isAudioPlaying,
    } = useContext(AppAudioContext) as AppAudioContextValues

    const prevSong = () => {
        if (currentPlaylist && currentSong) {
            const currentSongIndex = currentPlaylist.songs.indexOf(currentSong)
            if (currentSongIndex - 1 === -1) {
                setCurrentSong(currentPlaylist.songs[currentPlaylist.songs.length - 1])
            } else {
                setCurrentSong(currentPlaylist.songs[currentSongIndex - 1])
            }
        }
    }

    const nextSong = () => {
        if (currentPlaylist && currentSong) {
            const currentSongIndex = currentPlaylist.songs.indexOf(currentSong)
            if (currentSongIndex + 1 === currentPlaylist.songs.length) {
                setCurrentSong(currentPlaylist.songs[0])
            } else {
                setCurrentSong(currentPlaylist.songs[currentSongIndex + 1])
            }
        }
    }

    return (
        <div className="flex gap-5">
            <button className="disabled:text-slate-700" disabled={!Boolean(currentSong)} onClick={() => prevSong()}>
                <SkipBack className="w-6 h-6"/>
            </button>
            <button className="disabled:text-slate-700" disabled={!Boolean(currentSong)} onClick={() => togglePlayback()}>
                {
                    isAudioPlaying ?
                    <Pause className="w-6 h-6"/>
                    :
                    <PlayIcon className="w-6 h-6"/>
                }
            </button>
            <button className="disabled:text-slate-700" disabled={!Boolean(currentSong)} onClick={() => nextSong()}>
                <SkipForward className="w-6 h-6"/>
            </button>
        </div>
    )
}

export default PlaybackController