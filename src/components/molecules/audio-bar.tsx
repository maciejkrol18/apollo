import { AppAudioContext } from "@/contexts/app-audio-context"
import { AppAudioContextValues } from "@/ts/interfaces"
import { Pause, SkipForward, SkipBack, PlayIcon } from "lucide-react"
import { useContext, useEffect, useState, useRef} from "react"
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"
import PlaybackController from "../atoms/playback-controller";

const AudioBar: React.FC = () => {

    dayjs.extend(duration)

    const {
        currentSong, 
        audioElementRef,
        audioCurrentTime,
        audioGainRef
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

    return (
        <div className="grid grid-cols-3 px-10 items-center justify-center grow max-h-[200px] bg-menus-background">

            <div/>

            <div className="flex flex-col gap-3 items-center">
                <PlaybackController/>
                {currentSong &&
                <div className="flex gap-3 items-center">
                    <p className="w-14 text-center">
                        {
                            dayjs.duration
                            (
                                seekValue > currentSong.lengthInSeconds ? 
                                currentSong.lengthInSeconds : seekValue, 'seconds'
                            )
                            .format('mm:ss')
                        }
                    </p>
                    <input 
                        type="range" 
                        className="w-64 h-1" 
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

            <div className="flex justify-end">
                <button onClick={() => {
                    const volume = prompt('volume')
                    if (audioGainRef.current) {
                        audioGainRef.current.gain.value = Number(volume)
                    }
                }}>Placeholder volume changer</button>
            </div>

        </div>
    )
}

export default AudioBar