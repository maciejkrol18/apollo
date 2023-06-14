import { AppAudioContext } from "@/contexts/app-audio-context";
import { PlaylistObject } from "@/ts/interfaces";
import { useState, useEffect, useRef, useCallback } from 'react';

const AppAudio = ({children}: {children: React.ReactNode}) => {

    const [playlistsArray, setPlaylistsArray] = useState<PlaylistObject[]>(
        JSON.parse(localStorage.getItem("apollo-playlists") || '[]')
    )
    const wasAudioInitialized = useRef(false)
    const audioCtxRef = useRef<AudioContext | null>(null)
    const audioElementRef = useRef<HTMLAudioElement | null>(null)
    const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null)
    const audioGainRef = useRef<GainNode | null>(null)
    const audioAnalyserRef = useRef<AnalyserNode | null>(null)
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)

    // Save playlist changes to local storage
    useEffect(() => {
        localStorage.setItem("apollo-playlists", JSON.stringify(playlistsArray))
    },[playlistsArray])

    // Initialize Web Audio API components
    useEffect(() => {
        if (wasAudioInitialized.current) return
        const debugAudio = "https://asset.localhost/C%3A%5CUsers%5Cmacie%5CMusic%5Ctest%20mp3.mp3"

        wasAudioInitialized.current = true
        audioCtxRef.current = new AudioContext()
        audioElementRef.current = new Audio()
        audioSourceRef.current = audioCtxRef.current.createMediaElementSource(audioElementRef.current)
        audioGainRef.current = audioCtxRef.current.createGain()
        audioAnalyserRef.current = audioCtxRef.current.createAnalyser()
        audioElementRef.current.crossOrigin = 'anonymous' // For some reason required
        audioElementRef.current.src = debugAudio

        audioElementRef.current.onended = () => setIsAudioPlaying(false)

        audioSourceRef.current.connect(audioCtxRef.current.destination)
        audioGainRef.current.connect(audioCtxRef.current.destination)

        audioGainRef.current.gain.value = 0.3

        return () => {
            if (audioSourceRef.current && audioCtxRef.current) {
                audioSourceRef.current.disconnect();
                audioCtxRef.current.close();
            }
        };
    },[])

    // Pause/play audio
    const togglePlayback = useCallback(() => {
        if (audioElementRef.current) {
            setIsAudioPlaying(prev => !prev)
            isAudioPlaying ? audioElementRef.current.pause() : audioElementRef.current.play()
        }
    },[isAudioPlaying, audioElementRef.current])

    return (
        <AppAudioContext.Provider
            value={{
                playlistsArray,
                setPlaylistsArray,
                togglePlayback,
                isAudioPlaying,
            }}
        >
            {children}
        </AppAudioContext.Provider>
    )
}

export default AppAudio

// ** THIS DOESN'T WORK - JUST AN OLD VERSION FOR REFERENCE **

// const AppAudio = ({ children }: {children: React.ReactNode}) => {
//     const [currentPlaylistID, setCurrentPlaylistID] = useState(0);
//     const [currentSongID, setCurrentSongID] = useState(null);
//     const [isAudioPlaying, setIsAudioPlaying] = useState(false);
//     const audioRef = useRef();

//     useEffect(() => {
//         const audioElement = audioRef.current;
//         const audioCtx = new AudioContext();
//         const source = audioCtx.createMediaElementSource(audioElement);
//         const gainNode = audioCtx.createGain();
//         source.connect(audioCtx.destination);
//         gainNode.connect(audioCtx.destination);

//         return () => {
//             source.disconnect();
//             audioCtx.close();
//         };
//     }, []);

//     useEffect(() => {
//       const audioElement: HTMLAudioElement = audioRef.current;
//       if (audioElement) {
//         if (isAudioPlaying) {
//           audioElement.play();
//         } else {
//           audioElement.pause();
//         }
//       }
//     }, [isAudioPlaying]);
  
//     return (
//       <AppAudioContext.Provider
//         value={{
//           currentPlaylistID,
//           currentSongID,
//           setCurrentPlaylistID,
//           setCurrentSongID,
//         }}
//       >
//         <audio
//           ref={audioRef}
//           src={currentSongID.filepath}
//         />
//         <button onClick={() => setIsAudioPlaying((prevState) => !prevState)}>
//           {isAudioPlaying ? 'Pause' : 'Play'}
//         </button>
//         {children}
//       </AppAudioContext.Provider>
//     );
//   }