import { AppAudioContext } from "@/contexts/app-audio-context";
import { PlaylistObject, PlaylistSong } from "@/ts/interfaces";
import { useState, useEffect, useRef, useCallback } from 'react';

const AppAudio = ({children}: {children: React.ReactNode}) => {

    const [playlistsArray, setPlaylistsArray] = useState<PlaylistObject[]>(
        JSON.parse(localStorage.getItem("apollo-playlists") || '[]')
    )

    console.log('AppAudio is re-rendering.')

    const wasAudioInitialized = useRef(false)
    const audioCtxRef = useRef<AudioContext | null>(null)
    const audioElementRef = useRef<HTMLAudioElement | null>(null)
    const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null)
    const audioGainRef = useRef<GainNode | null>(null)
    const audioAnalyserRef = useRef<AnalyserNode | null>(null)

    const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)
    const [shouldAutoplay, setShouldAutoplay] = useState<boolean>(false)
    const [currentSong, setCurrentSong] = useState<PlaylistSong | null>(null)
    const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistObject | null>(null)
    const [audioEnded, setAudioEnded] = useState(false)

    console.log('Current song:', currentSong)
    console.log('Current playlist:', currentPlaylist)

    // Save playlist changes to local storage
    useEffect(() => {
        localStorage.setItem("apollo-playlists", JSON.stringify(playlistsArray))
    },[playlistsArray])

    // Initialize Web Audio API components
    useEffect(() => {
        if (wasAudioInitialized.current) return

        wasAudioInitialized.current = true
        audioCtxRef.current = new AudioContext()
        audioElementRef.current = new Audio()
        audioSourceRef.current = audioCtxRef.current.createMediaElementSource(audioElementRef.current)
        audioGainRef.current = audioCtxRef.current.createGain()
        audioAnalyserRef.current = audioCtxRef.current.createAnalyser()
        audioElementRef.current.crossOrigin = 'anonymous' // For some reason required
        audioElementRef.current.autoplay = shouldAutoplay

        audioElementRef.current.onended = () => setAudioEnded(true)

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

    // Change the song
    useEffect(() => {
        if (currentSong && audioElementRef.current) {
            audioElementRef.current.src = currentSong.convertedFilepath 
            setShouldAutoplay(true)
            setIsAudioPlaying(true)
            console.log('Changed the song. Current src:', audioElementRef.current.src)
        }
    },[currentSong])

    // Automatically play the song 
    useEffect(() => {
        if (audioElementRef.current) {
            audioElementRef.current.autoplay = shouldAutoplay
        }
    },[shouldAutoplay])

    // Toggle playback
    useEffect(() => {  
        if (audioElementRef.current) {
            console.log('Toggling playback.')
            isAudioPlaying ? audioElementRef.current.play() : audioElementRef.current.pause()
        }
    },[isAudioPlaying])

    // Play the next song in the playlist when the audio file ends
    useEffect(() => {
        if (audioEnded && currentPlaylist && currentSong) {
            console.log('Handling next song')
            const currentSongIndex = currentPlaylist.songs.indexOf(currentSong)
            if (currentSongIndex + 1 === currentPlaylist.songs.length + 1) {
                setCurrentSong(currentPlaylist.songs[0])
            } else {
                setCurrentSong(currentPlaylist.songs[currentSongIndex + 1])
            }
            setAudioEnded(false)
        }
    },[audioEnded])

    const togglePlayback = () => {
        if (audioElementRef.current) {
            setIsAudioPlaying(prev => !prev)
        }
    }

    return (
        <AppAudioContext.Provider
            value={{
                playlistsArray,
                setPlaylistsArray,
                togglePlayback,
                isAudioPlaying,
                currentSong,
                setCurrentSong,
                setCurrentPlaylist
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