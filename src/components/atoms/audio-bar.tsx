import { AppAudioContext } from "@/contexts/app-audio-context"
import { AppAudioContextValues } from "@/ts/interfaces"
import { Pause, SkipForward, SkipBack, PlayIcon } from "lucide-react"
import { useContext, useEffect, useState, useRef} from "react"
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"

const AudioBar: React.FC = () => {

    dayjs.extend(duration)

    const {
        currentSong, setCurrentSong, 
        currentPlaylist, 
        togglePlayback, 
        isAudioPlaying, audioElementRef,
        audioCurrentTime
    } = useContext(AppAudioContext) as AppAudioContextValues

    const [isSeeking, setIsSeeking] = useState(false)
    const [seekValue, setSeekValue] = useState(0)
    const seekBarRef = useRef(null)

    // Triggers every second of the audio playback
    useEffect(() => {
        if (seekBarRef.current && audioCurrentTime && !isSeeking) {
            const bar = seekBarRef.current as HTMLInputElement
            bar.value = audioCurrentTime.toString()
            setSeekValue(audioCurrentTime)
        }
    },[audioCurrentTime])

    // Reset the values on song change
    useEffect(() => {
        setSeekValue(0)
        if (seekBarRef.current) {
            const bar = seekBarRef.current as HTMLInputElement
            bar.value = "0"
        }
    },[currentSong])

    const handleSeekChange = (e: React.MouseEvent<HTMLInputElement>) => {
        if (audioElementRef.current) {
            const eventTarget = e.target as HTMLInputElement
            audioElementRef.current.currentTime = Number(eventTarget.value)
            setIsSeeking(false)
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

    return (
        <div className="flex items-center justify-center grow max-h-[200px] bg-menus-background">
            <div className="flex flex-col gap-3 items-center">
                <div className="flex gap-5">
                    <button disabled={!Boolean(currentSong)} onClick={() => prevSong()}>
                        <SkipBack className="w-6 h-6"/>
                    </button>
                    <button disabled={!Boolean(currentSong)} onClick={() => togglePlayback()}>
                        {
                            isAudioPlaying ?
                            <Pause className="w-6 h-6"/>
                            :
                            <PlayIcon className="w-6 h-6"/>
                        }
                    </button>
                    <button disabled={!Boolean(currentSong)} onClick={() => nextSong()}>
                        <SkipForward className="w-6 h-6"/>
                    </button>
                </div>
                {currentSong &&
                <div className="flex gap-3 items-center">
                    <p className="w-14 text-center">
                        {
                            dayjs.duration(seekValue, 'seconds').format('mm:ss')
                        }
                    </p>
                    <input 
                        type="range" 
                        className="w-64" 
                        ref={seekBarRef}
                        onChange={(e) => setSeekValue(Number(e.target.value))}
                        onMouseDown={() => setIsSeeking(true)}
                        onMouseUp={(e) => handleSeekChange(e)}
                        max={currentSong.lengthInSeconds}
                        step={1}
                    />
                    <p className="w-14 text-center">
                        {
                            dayjs.duration(currentSong.lengthInSeconds, 'seconds').format('mm:ss')
                        }
                    </p>
                </div>
                }
                <p className="text-lg text-center font-bold">{currentSong?.title}</p>
            </div>
        </div>
    )
}

export default AudioBar