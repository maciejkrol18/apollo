import { PlaylistObject } from "@/ts/interfaces";
import Image from "next/image"
import PlaylistMeta from "../atoms/playlist-meta"
import PlaylistControls from "../atoms/playlist-controls";

interface PlaylistHeaderProps {
    playlistsArray: Array<PlaylistObject>
    targetPlaylist: PlaylistObject | undefined;
    setPlaylistsArray: React.Dispatch<React.SetStateAction<PlaylistObject[]>>
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = (
    {targetPlaylist, setPlaylistsArray}
) => {
    return (
        <header className="flex gap-7">
            <Image 
                width={200}
                height={200}
                className="drop-shadow-xl rounded-lg" 
                src={targetPlaylist?.coverImgPath as string}
                alt={`${targetPlaylist?.title} cover image`}
            />
            <div className="flex flex-col justify-between">
                <PlaylistMeta
                    title={targetPlaylist?.title}
                    creationDate={targetPlaylist?.creationDate}
                    songsAmount={targetPlaylist?.songs.length}
                    id={targetPlaylist?.id}
                />
                <PlaylistControls
                    setPlaylistsArray={setPlaylistsArray}
                    id={targetPlaylist?.id}
                    targetPlaylist={targetPlaylist}
                />
            </div>
        </header>
    )
}

export default PlaylistHeader