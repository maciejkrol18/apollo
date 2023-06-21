import { AppAudioContext } from "@/contexts/app-audio-context"
import { AppAudioContextValues } from "@/ts/interfaces"
import { Volume2 } from "lucide-react"
import { useContext, useEffect, useRef, useCallback } from "react"

const VolumeController: React.FC = () => {
    const {audioGainRef} = useContext(AppAudioContext) as AppAudioContextValues
    const volumeInputRef = useRef(null)

    useEffect(() => {
        if (volumeInputRef.current && audioGainRef.current) {
            const input = volumeInputRef.current as HTMLInputElement
            input.value = audioGainRef.current.gain.value.toString()
        }
    },[audioGainRef.current])

    const changeVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioGainRef.current) {
            audioGainRef.current.gain.value = Number(e.target.value)
        }
    },[])

    console.log('VolumeController renders')

    return (
        <div className="flex gap-2 items-center">
            <Volume2/>
            <input
                className="w-32 h-1"
                type="range"
                ref={volumeInputRef}
                min={0}
                max={1}
                step={0.01}
                onChange={(e) => changeVolume(e)}
            />
        </div>
    )
}

export default VolumeController