import { AppAudioContext } from "@/contexts/AppAudioContext";
import { AppAudioContextValues } from "@/ts/interfaces";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useContext, useEffect, useRef, useCallback, useState } from "react";

const VolumeController: React.FC = () => {
  const { audioGainRef } = useContext(AppAudioContext) as AppAudioContextValues;
  const volumeInputRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.1);

  useEffect(() => {
    if (volumeInputRef.current && audioGainRef.current) {
      const input = volumeInputRef.current as HTMLInputElement;
      input.value = audioGainRef.current.gain.value.toString();
    }
  }, [audioGainRef.current]);

  useEffect(() => {
    if (audioGainRef.current) {
      audioGainRef.current.gain.value = volume;
    }
    volume > 0 ? setIsMuted(false) : setIsMuted(true);
    localStorage.setItem("apollo-volume", volume.toString());
  }, [volume]);

  const changeVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  }, []);

  const handleSpeakerClick = useCallback(() => {
    if (volumeInputRef.current && audioGainRef.current) {
      const input = volumeInputRef.current as HTMLInputElement;
      if (isMuted) {
        audioGainRef.current.gain.value = volume;
        input.value = volume.toString();
        setIsMuted(false);
      } else {
        audioGainRef.current.gain.value = 0;
        input.value = "0";
        setIsMuted(true);
      }
    }
  }, [isMuted, volume]);

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => handleSpeakerClick()}>
        {isMuted || volume === 0 ? <VolumeX /> : volume > 0.3 ? <Volume2 /> : <Volume1 />}
      </button>
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
  );
};

export default VolumeController;
