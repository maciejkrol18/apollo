import { PlaylistObject } from "@/ts/interfaces";
import PlaylistMeta from "../atoms/playlist-meta"
import PlaylistControls from "../atoms/playlist-controls";

interface PlaylistHeaderProps {
    title: string | undefined;
    coverImgPath: string | undefined;
    creationDate: Date | undefined;
    songsAmount: number | undefined;
    id: string | undefined;
    playlistsArray: Array<PlaylistObject>
    setPlaylistsArray: React.Dispatch<React.SetStateAction<PlaylistObject[]>>
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({coverImgPath, title, creationDate, songsAmount, id, playlistsArray, setPlaylistsArray}) => {
    return (
        <header className="flex gap-7">
            <img className="w-[200px] h-[200px] drop-shadow-xl rounded-lg" src={coverImgPath}/>
            <div className="flex flex-col justify-between">
                <PlaylistMeta
                    title={title}
                    creationDate={creationDate}
                    songsAmount={songsAmount}
                    id={id}
                />
                <PlaylistControls
                    playlistsArray={playlistsArray}
                    setPlaylistsArray={setPlaylistsArray}
                    id={id}
                />
            </div>
        </header>
    )
}

export default PlaylistHeader