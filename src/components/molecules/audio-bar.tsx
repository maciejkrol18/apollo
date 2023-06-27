import { AppAudioContext } from "@/contexts/app-audio-context"
import { AppAudioContextValues } from "@/ts/interfaces"
import { useContext } from "react"
import PlaybackController from "../atoms/playback-controller";
import SeekBar from "../atoms/seek-bar";
import VolumeController from "../atoms/volume-controller";

const AudioBar: React.FC = () => {
    const {currentSong} = useContext(AppAudioContext) as AppAudioContextValues

    return (
        <div className="grid grid-cols-3 p-8 items-center bg-menus-background">
            <div/>

            <div className="flex flex-col gap-3 items-center">
                <PlaybackController/>
                <SeekBar/>
                <p 
                    className="text-sm text-center max-w-full max-h-[28px] text-ellipsis overflow-hidden whitespace-nowrap"
                    title={currentSong?.title}
                >
                    {currentSong?.title}
                </p>
            </div>

            <div className="flex justify-end">
                <VolumeController/>
            </div>
        </div>
    )
}

export default AudioBar