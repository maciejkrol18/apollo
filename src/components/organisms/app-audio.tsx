import { AppAudioContext } from "@/contexts/app-audio-context";
import { PlaylistObject } from "@/ts/interfaces";
import { useState, useEffect } from 'react';

const AppAudio = ({children}: {children: React.ReactNode}) => {
    const [playlistsArray, setPlaylistsArray] = useState<Array<PlaylistObject>>(
        JSON.parse(localStorage.getItem("apollo-playlists") || '[]')
    )

    useEffect(() => {
        localStorage.setItem("apollo-playlists", JSON.stringify(playlistsArray))
    },[playlistsArray])

    console.log('AppAudio playlistArray value:', playlistsArray)

    return (
        <AppAudioContext.Provider
            value={{
                playlistsArray,
                setPlaylistsArray
            }}
        >
            {children}
        </AppAudioContext.Provider>
    )
}

export default AppAudio

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