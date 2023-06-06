import { PlaylistObject } from "@/ts/interfaces";
import PlaylistMeta from "../atoms/playlist-meta"
import PlaylistControls from "../atoms/playlist-controls";

interface PlaylistHeaderProps {
    playlistsArray: Array<PlaylistObject>
    targetPlaylist: PlaylistObject | undefined;
    setPlaylistsArray: React.Dispatch<React.SetStateAction<PlaylistObject[]>>
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = (
    {targetPlaylist, playlistsArray, setPlaylistsArray}
) => {
    return (
        <header className="flex gap-7">
            <img className="w-[200px] h-[200px] drop-shadow-xl rounded-lg" src={targetPlaylist?.coverImgPath}/>
            <div className="flex flex-col justify-between">
                <PlaylistMeta
                    title={targetPlaylist?.title}
                    creationDate={targetPlaylist?.creationDate}
                    songsAmount={targetPlaylist?.songs.length}
                    id={targetPlaylist?.id}
                />
                <PlaylistControls
                    playlistsArray={playlistsArray}
                    setPlaylistsArray={setPlaylistsArray}
                    id={targetPlaylist?.id}
                    targetPlaylist={targetPlaylist}
                />
            </div>
        </header>
    )
}

export default PlaylistHeader