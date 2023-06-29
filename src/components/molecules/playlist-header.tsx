import { PlaylistObject } from "@/ts/interfaces";
import PlaylistMeta from "../atoms/playlist-meta"
import PlaylistControls from "../atoms/playlist-controls";
import { open } from '@tauri-apps/api/dialog';
import { convertFileSrc } from '@tauri-apps/api/tauri';

interface PlaylistHeaderProps {
    playlistsArray: Array<PlaylistObject>
    targetPlaylist: PlaylistObject | undefined;
    setPlaylistsArray: React.Dispatch<React.SetStateAction<PlaylistObject[]>>
}

const getImageFilePath = async () => {
    const selection = await open({
        filters: [{
            name: 'Image file',
            extensions: ['jpg', 'jpeg', 'png', 'webp']
        }],
    })
    if (selection) {
        return convertFileSrc(selection as string)  
    }
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = (
    {targetPlaylist, setPlaylistsArray}
) => {

    const setNewCover = async () => {
        const imagePath = await getImageFilePath()
        if (imagePath) {
            setPlaylistsArray((prevPlaylists) => {
                return prevPlaylists.map((playlist) => {
                    if (playlist.id === targetPlaylist?.id) {
                        return {
                            ...playlist,
                            coverImgPath: imagePath
                        }
                    } else {
                        return playlist
                    }
                }) 
            })
        }
    }

    return (
        <header className="flex gap-7">
            <img 
                className="w-[200px] h-[200px] drop-shadow-xl rounded-lg object-cover cursor-pointer" 
                src={targetPlaylist?.coverImgPath as string}
                alt={`${targetPlaylist?.title} cover image`}
                onClick={() => setNewCover()}
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