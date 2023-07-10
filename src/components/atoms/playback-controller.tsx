import { AppAudioContext } from "@/contexts/app-audio-context"
import { AppAudioContextValues } from "@/ts/interfaces"
import { SkipBack, Pause, PlayIcon, SkipForward } from "lucide-react"
import { useContext, useEffect } from "react"

const PlaybackController: React.FC = () => {

    const {
        currentSong, setCurrentSong, 
        currentPlaylist, 
        togglePlayback, 
        isAudioPlaying,
    } = useContext(AppAudioContext) as AppAudioContextValues

    const handleSpacebar = (e: KeyboardEvent) => {
        if (e.code === "Space") {
            togglePlayback()
        }
    }

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

    useEffect(() => {
        window.addEventListener('keydown', handleSpacebar)

        return () => {
            window.removeEventListener('keydown', handleSpacebar)
        }
    },[])

    return (
        <div className="flex gap-5">
            <button onClick={() => prevSong()}>
                <SkipBack className="w-6 h-6"/>
            </button>
            <button onClick={() => togglePlayback()}>
                {
                    isAudioPlaying ?
                    <Pause className="w-6 h-6"/>
                    :
                    <PlayIcon className="w-6 h-6"/>
                }
            </button>
            <button onClick={() => nextSong()}>
                <SkipForward className="w-6 h-6"/>
            </button>
        </div>
    )
}

export default PlaybackController