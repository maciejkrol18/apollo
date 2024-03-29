import { AppAudioContextValues, PlaylistObject } from "@/ts/interfaces";
import { Edit, PlayCircle, Pause, PlusCircle, Trash } from "lucide-react";
import { open } from "@tauri-apps/api/dialog";
import { nanoid } from "nanoid";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { basename, resolveResource, audioDir } from "@tauri-apps/api/path";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { invoke } from "@tauri-apps/api/tauri";
import Modal from "./Modal";
import { AppAudioContext } from "@/contexts/AppAudioContext";

interface PlaylistControlsProps {
  setPlaylistsArray: React.Dispatch<React.SetStateAction<PlaylistObject[]>>;
  id: string | undefined;
  targetPlaylist: PlaylistObject | undefined;
}

const getFilesFromDialog = async () => {
  const selectedFiles = await open({
    multiple: true,
    filters: [
      {
        name: "Audio file",
        extensions: ["mp3", "flac", "ogg", "wav"],
      },
    ],
    defaultPath: await audioDir(),
  });
  const selection = selectedFiles as Array<string>;
  if (selection) {
    return await Promise.all(
      selection.map(async (entry) => {
        const resource = await resolveResource(entry);
        const base = await basename(resource);
        const length = await invoke("get_audio_file_duration", {
          filepath: entry,
        }).then((res: any) => res);
        return {
          title: base.substring(0, base.length - 4),
          convertedFilepath: convertFileSrc(entry),
          lengthInSeconds: length,
          dateAdded: new Date(),
          id: nanoid(),
        };
      }),
    );
  }
};

const PlaylistControls: React.FC<PlaylistControlsProps> = ({
  setPlaylistsArray,
  id,
  targetPlaylist,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [playlistTitle, setPlaylistTitle] = useState<string | undefined>(
    targetPlaylist?.title,
  );
  const { setCurrentSong, currentPlaylist, togglePlayback, isAudioPlaying } = useContext(
    AppAudioContext,
  ) as AppAudioContextValues;

  useEffect(() => {
    if (targetPlaylist) {
      setPlaylistTitle(targetPlaylist.title);
    }
  }, [targetPlaylist]);

  const addSongsToPlaylist = async () => {
    const songs = await getFilesFromDialog();
    if (songs) {
      setPlaylistsArray((prevPlaylists) => {
        return prevPlaylists.map((playlist) => {
          if (playlist.id === id) {
            return {
              ...playlist,
              songs: [...songs, ...playlist.songs],
            };
          } else {
            return playlist;
          }
        });
      });
    }
  };

  const removePlaylist = () => {
    if (targetPlaylist) {
      setPlaylistsArray((prevPlaylists) => {
        return prevPlaylists.filter((playlist) => playlist !== targetPlaylist);
      });
    }
    router.push("/");
  };

  const playPlaylist = () => {
    console.log("playPlaylist clicked");
    if (targetPlaylist) {
      if (targetPlaylist.id === currentPlaylist?.id) {
        console.log("toggling playback");
        togglePlayback();
      } else {
        console.log("changing current playlist");
        setPlaylistsArray((prev) =>
          prev.map((obj) => {
            return obj.id === targetPlaylist.id
              ? { ...obj, currentPlaylist: true }
              : { ...obj, currentPlaylist: false };
          }),
        );
        setCurrentSong(targetPlaylist.songs[0]);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (targetPlaylist && playlistTitle) {
      setPlaylistsArray((prevPlaylists) => {
        return prevPlaylists.map((playlist) => {
          if (playlist.id === targetPlaylist.id) {
            return {
              ...playlist,
              title: playlistTitle as string,
            };
          } else {
            return playlist;
          }
        });
      });
      setIsModalOpen((prev) => !prev);
    }
  };

  const modalContent = (
    <div className="flex gap-4">
      <img
        className="w-[256px] h-[256px]"
        alt={`${targetPlaylist?.title} cover image`}
        src={targetPlaylist?.coverImgPath as string}
      />
      <form
        className="flex flex-col justify-between grow"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="flex flex-col">
          <p>Playlist title</p>
          {!playlistTitle && (
            <p className="my-1 text-red-600">The playlist title cannot be empty</p>
          )}
          <input
            type="text"
            className="bg-menus-foreground-muted indent-1 py-2 rounded-md mt-2"
            value={playlistTitle}
            onChange={(e) => setPlaylistTitle(e.target.value)}
          />
        </div>
        <button className="bg-brand py-1 px-3 rounded-xl">Save changes</button>
      </form>
    </div>
  );

  return (
    <div className="flex gap-4 text-brand">
      {targetPlaylist && targetPlaylist.songs.length > 0 && (
        <button onClick={() => playPlaylist()}>
          {targetPlaylist.id === currentPlaylist?.id && isAudioPlaying ? (
            <Pause className="w-10 h-10" />
          ) : (
            <PlayCircle className="w-10 h-10" />
          )}
        </button>
      )}
      <button onClick={() => addSongsToPlaylist()}>
        <PlusCircle className="w-10 h-10" />
      </button>
      <button onClick={() => setIsModalOpen((prev) => !prev)}>
        <Edit className="w-10 h-10" />
      </button>
      <button onClick={() => removePlaylist()}>
        <Trash className="w-10 h-10" />
      </button>
      {isModalOpen && (
        <Modal
          title={`Editing "${targetPlaylist?.title}"`}
          content={modalContent}
          toggleModal={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default PlaylistControls;
