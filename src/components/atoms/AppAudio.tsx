import { AppAudioContext } from "@/contexts/AppAudioContext";
import { PlaylistObject, PlaylistSong } from "@/ts/interfaces";
import { useState, useEffect, useRef, useCallback } from "react";

const AppAudio = ({ children }: { children: React.ReactNode }) => {
  const [playlistsArray, setPlaylistsArray] = useState<PlaylistObject[]>(
    JSON.parse(localStorage.getItem("apollo-playlists") || "[]"),
  );

  const wasAudioInitialized = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioGainRef = useRef<GainNode | null>(null);
  const audioAnalyserRef = useRef<AnalyserNode | null>(null);

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [shouldAutoplay, setShouldAutoplay] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<PlaylistSong | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistObject | null>(null);
  const [audioEnded, setAudioEnded] = useState<boolean>(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number | undefined>(0);

  // Save playlist changes to local storage
  useEffect(() => {
    localStorage.setItem("apollo-playlists", JSON.stringify(playlistsArray));
    const targetPlaylist = playlistsArray.find((playlist) => playlist.currentPlaylist);
    targetPlaylist ? setCurrentPlaylist(targetPlaylist) : setCurrentPlaylist(null);
  }, [playlistsArray]);

  // Initialize Web Audio API components
  useEffect(() => {
    if (wasAudioInitialized.current) return;
    wasAudioInitialized.current = true;

    audioCtxRef.current = new AudioContext();
    audioElementRef.current = new Audio();
    audioGainRef.current = audioCtxRef.current.createGain();
    audioSourceRef.current = audioCtxRef.current.createMediaElementSource(
      audioElementRef.current,
    );
    audioAnalyserRef.current = audioCtxRef.current.createAnalyser();

    audioElementRef.current.crossOrigin = "anonymous";
    audioElementRef.current.preload = "metadata";
    audioElementRef.current.autoplay = shouldAutoplay;

    audioElementRef.current.onended = () => setAudioEnded(true);
    audioElementRef.current.ontimeupdate = () => {
      if (audioElementRef.current?.currentTime !== undefined) {
        setAudioCurrentTime(Math.floor(audioElementRef.current?.currentTime));
      } else {
        setAudioCurrentTime(0);
      }
    };

    audioGainRef.current.connect(audioCtxRef.current.destination);
    audioSourceRef.current.connect(audioGainRef.current);

    audioGainRef.current.gain.value = Number(localStorage.getItem("apollo-volume"));

    return () => {
      if (audioSourceRef.current && audioCtxRef.current) {
        audioSourceRef.current.disconnect();
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Change the song
  useEffect(() => {
    if (currentSong && audioElementRef.current) {
      audioElementRef.current.src = currentSong.convertedFilepath;
      setShouldAutoplay(true);
      setIsAudioPlaying(true);
    }
  }, [currentSong]);

  // Automatically play the song
  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.autoplay = shouldAutoplay;
    }
  }, [shouldAutoplay]);

  // Toggle playback
  useEffect(() => {
    if (audioElementRef.current) {
      console.log("Toggling playback.");
      isAudioPlaying ? audioElementRef.current.play() : audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Play the next song in the playlist when the audio file ends
  useEffect(() => {
    if (audioEnded && currentPlaylist && currentSong) {
      const currentSongIndex = currentPlaylist.songs.indexOf(currentSong);
      if (currentSongIndex + 1 === currentPlaylist.songs.length) {
        setIsAudioPlaying(false);
      } else {
        setCurrentSong(currentPlaylist.songs[currentSongIndex + 1]);
      }
      setAudioEnded(false);
    }
  }, [audioEnded]);

  const togglePlayback = useCallback(() => {
    if (audioElementRef.current) {
      setIsAudioPlaying((prev) => !prev);
    }
  }, [isAudioPlaying]);

  return (
    <AppAudioContext.Provider
      value={{
        playlistsArray,
        setPlaylistsArray,
        togglePlayback,
        isAudioPlaying,
        currentSong,
        setCurrentSong,
        currentPlaylist,
        audioElementRef,
        audioCurrentTime,
        audioGainRef,
      }}
    >
      {children}
    </AppAudioContext.Provider>
  );
};

export default AppAudio;
