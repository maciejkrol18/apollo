import { AppAudioContext } from "@/contexts/AppAudioContext";
import { PlaylistObject, PlaylistSong } from "@/ts/interfaces";
import { useState, useEffect, useRef, useCallback } from "react";

const AppAudio = ({ children }: { children: React.ReactNode }) => {
	const [playlistsArray, setPlaylistsArray] = useState<PlaylistObject[]>(
		JSON.parse(localStorage.getItem("apollo-playlists") || "[]")
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
	const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistObject | null>(
		null
	);
	const [audioEnded, setAudioEnded] = useState<boolean>(false);
	const [audioCurrentTime, setAudioCurrentTime] = useState<number | undefined>(
		0
	);

	// Save playlist changes to local storage
	useEffect(() => {
		localStorage.setItem("apollo-playlists", JSON.stringify(playlistsArray));
		/*
      TODO: SHOULD BE REPLACED IN THE FUTURE WITH SOMETHING BETTER.

      This setter ensures that the state of 'currentPlaylist'
      stays up to date when modifying the current playlist.
      Without this bit of code, any change to the current playlist, such as
      editing the title or removing one of the songs wouldn't change the state
      of 'currentPlaylist'. Because of this, for example, you could go back 
      to a previous song which was deleted using the 'PlaybackController' as this component 
      relies on the state of 'currentPlaylist' object, which was still the old version.

      If currentPlaylist is set, we find the target playlist in the main
      playlists array by ID, because it's updated version is located there.
      If it's found, 'currentPlaylist' gets set to the found object, else it 
      gets set back to null.
    */
		if (currentPlaylist) {
			setCurrentPlaylist(() => {
				const targetPlaylist = playlistsArray.find(
					(obj) => obj.id === currentPlaylist.id
				);
				return targetPlaylist ? targetPlaylist : null;
			});
		}
	}, [playlistsArray]);

	// Initialize Web Audio API components
	useEffect(() => {
		if (wasAudioInitialized.current) return;
		wasAudioInitialized.current = true;

		audioCtxRef.current = new AudioContext();
		audioElementRef.current = new Audio();
		audioGainRef.current = audioCtxRef.current.createGain();
		audioSourceRef.current = audioCtxRef.current.createMediaElementSource(
			audioElementRef.current
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

		audioGainRef.current.gain.value = Number(
			localStorage.getItem("apollo-volume")
		);

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
			isAudioPlaying
				? audioElementRef.current.play()
				: audioElementRef.current.pause();
		}
	}, [isAudioPlaying]);

	// Play the next song in the playlist when the audio file ends
	useEffect(() => {
		if (audioEnded && currentPlaylist && currentSong) {
			console.log("Handling next song");
			const currentSongIndex = currentPlaylist.songs.indexOf(currentSong);
			if (currentSongIndex + 1 === currentPlaylist.songs.length) {
				setIsAudioPlaying(false);
			} else {
				console.log(
					"setCurrentSong(currentPlaylist.songs[currentSongIndex + 1])"
				);
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
				setCurrentPlaylist,
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
