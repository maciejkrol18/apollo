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

    useEffect(() => {
        if (seekBarRef.current && !isSeeking) {
            const input = seekBarRef.current as HTMLInputElement
            if (audioCurrentTime) {
                input.value = audioCurrentTime.toString()
            }
        }
    },[audioCurrentTime])

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioElementRef.current) {
            audioElementRef.current.currentTime = Number(e.target.value)
            setIsSeeking(false)
        }
    }

    const prevSong = () => {
        if (currentPlaylist && currentSong) {
            const currentSongIndex = currentPlaylist.songs.indexOf(currentSong)
            if (currentSongIndex - 1 === -1) {
                console.log('gowno')
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

    const seekBarRef = useRef(null)

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
                            audioCurrentTime === 0 ?
                            '00:00'
                            :
                            audioCurrentTime && dayjs.duration(audioCurrentTime, 'seconds').format('mm:ss')
                        }
                    </p>
                    {/* <div className="bg-slate-800 w-[300px] h-2 rounded-lg">
                            <div 
                                style={{width: `${getDurationBarWidth()}%`}}
                                className="bg-slate-600 h-full rounded-lg"
                            />
                    </div> */}
                    <input 
                        type="range" 
                        className="w-64" 
                        ref={seekBarRef}
                        onInput={() => setIsSeeking(true)}
                        onChange={(e) => handleSeek(e)}
                        min={0} 
                        step={1} 
                        max={currentSong.lengthInSeconds}
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