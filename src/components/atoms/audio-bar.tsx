import { AppAudioContext } from "@/contexts/app-audio-context"
import { AppAudioContextValues } from "@/ts/interfaces"
import { Pause, PlayIcon } from "lucide-react"
import { useContext } from "react"

const AudioBar: React.FC = () => {
    const {currentSong, togglePlayback, isAudioPlaying} = useContext(AppAudioContext) as AppAudioContextValues
    return (
        <div className="flex items-center justify-center grow max-h-[200px] bg-menus-background">
            <div className="flex flex-col">
                <div className="flex gap-3">
                    <button disabled={!Boolean(currentSong)} onClick={() => togglePlayback()}>
                        {
                            isAudioPlaying ?
                            <Pause className="w-6 h-6"/>
                            :
                            <PlayIcon className="w-6 h-6"/>
                        }
                    </button>
                </div>
            </div>
            <p className="text-xl text-center font-bold">{currentSong?.title}</p>
        </div>
    )
}

export default AudioBar