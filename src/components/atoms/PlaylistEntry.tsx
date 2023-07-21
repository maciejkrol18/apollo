import { AppAudioContext } from "@/contexts/AppAudioContext";
import { AppAudioContextValues, PlaylistObject, PlaylistSong } from "@/ts/interfaces";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useContext, useCallback, useState } from "react";
import AudioWaves from "./AudioWaves";
import { PauseIcon, Play, Trash } from "lucide-react";
import ContextMenu from "./ContextMenu";

interface PlaylistEntryProps {
  song: PlaylistSong;
  playlist: PlaylistObject;
  idx: number;
}

const PlaylistEntry: React.FC<PlaylistEntryProps> = ({ song, playlist, idx }) => {
  const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
  };

  const [contextMenu, setContextMenu] = useState(initialContextMenu);

  const {
    togglePlayback,
    isAudioPlaying,
    currentSong,
    setCurrentSong,
    setPlaylistsArray,
  } = useContext(AppAudioContext) as AppAudioContextValues;

  dayjs.extend(duration);
  const formattedDateAdded = dayjs(song.dateAdded).format("DD.MM.YYYY");
  const formattedSeconds = dayjs
    .duration(song.lengthInSeconds, "seconds")
    .format("mm:ss");

  const playSong = useCallback(() => {
    if (song === currentSong) {
      togglePlayback();
    } else {
      setCurrentSong(song);
      setPlaylistsArray((prev) =>
        prev.map((obj) => {
          return obj.id === playlist.id
            ? { ...obj, currentPlaylist: true }
            : { ...obj, currentPlaylist: false };
        }),
      );
    }
  }, [currentSong, song, playlist]);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };

  const closeContextMenu = () => setContextMenu(initialContextMenu);

  const removeSong = useCallback(() => {
    setPlaylistsArray((prev) =>
      prev.map((obj) => {
        return obj.id === playlist.id
          ? {
              ...obj,
              songs: playlist.songs.filter((filteredSong) => filteredSong.id !== song.id),
            }
          : obj;
      }),
    );
    closeContextMenu();
  }, [playlist, song]);

  const contextMenuContent = (
    <div className="flex flex-col gap-4">
      <p
        className="italic max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap"
        title={song.title}
      >
        {song.title}
      </p>
      <button className="flex gap-2 items-center" onClick={() => removeSong()}>
        <Trash className="w-5 h-5" /> Remove
      </button>
    </div>
  );

  return (
    <div
      className="hover:bg-playlist-entry-highlight rounded-md grid grid-cols-table-row"
      onDoubleClick={() => playSong()}
      onContextMenu={(e) => handleContextMenu(e)}
    >
      <div className="p-2">
        <div className="group">
          {currentSong === song && isAudioPlaying ? (
            <AudioWaves className="group-hover:hidden" />
          ) : currentSong === song && !isAudioPlaying ? (
            <p className="text-brand group-hover:hidden">{idx + 1}</p>
          ) : (
            <p className="group-hover:hidden">{idx + 1}</p>
          )}
          <button className="hidden group-hover:block" onClick={() => playSong()}>
            {isAudioPlaying && currentSong === song ? <PauseIcon /> : <Play />}
          </button>
        </div>
      </div>
      <div className="p-2 text-ellipsis overflow-hidden whitespace-nowrap">
        {currentSong === song ? (
          <p className="text-brand">{song.title}</p>
        ) : (
          <p>{song.title}</p>
        )}
      </div>
      <div className="p-2">{formattedDateAdded}</div>
      <div className="p-2">{formattedSeconds}</div>

      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          closeContextMenu={closeContextMenu}
        >
          {contextMenuContent}
        </ContextMenu>
      )}
    </div>
  );
};

export default PlaylistEntry;
