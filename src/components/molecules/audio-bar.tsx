import { AppAudioContext } from "@/contexts/app-audio-context"
import { AppAudioContextValues } from "@/ts/interfaces"
import { useContext } from "react"
import PlaybackController from "../atoms/playback-controller";
import SeekBar from "../atoms/seek-bar";

const AudioBar: React.FC = () => {
    const {currentSong, audioGainRef} = useContext(AppAudioContext) as AppAudioContextValues

    return (
        <div className="grid grid-cols-3 px-10 items-center justify-center grow max-h-[200px] bg-menus-background">
            <div/>

            <div className="flex flex-col gap-3 items-center">
                <PlaybackController/>
                <SeekBar/>
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