import { PlaylistObject } from "@/ts/interfaces"
import { Edit, PlayCircle, PlusCircle } from "lucide-react"
import { open } from '@tauri-apps/api/dialog';
import { nanoid } from "nanoid";
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { basename, resolveResource, audioDir } from '@tauri-apps/api/path';
import { useCallback, useState } from "react";
import Modal from "./modal";

interface PlaylistControlsProps {
    playlistsArray: Array<PlaylistObject>
    setPlaylistsArray: React.Dispatch<React.SetStateAction<PlaylistObject[]>>;
    id: string | undefined;
}

const getFilesFromDialog = async () => {
    const selectedFiles = await open({
        multiple: true,
        filters: [{
            name: 'Audio file',
            extensions: ['mp3', 'flac', 'ogg', 'wav']
        }],
        defaultPath: await audioDir()
    });
    const selection = selectedFiles as Array<string>
    if (selection) {
        return await Promise.all(
            selection.map(async (entry) => {
                const resource = await resolveResource(entry)
                const base = await basename(resource)
                return {
                    title: base.substring(0, base.length - 4),
                    convertedFilepath: convertFileSrc(entry),
                    id: nanoid()
                }
            })
        )
    }
}

const PlaylistControls: React.FC<PlaylistControlsProps> = ({playlistsArray, setPlaylistsArray, id}) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const targetPlaylist = playlistsArray.find(playlist => playlist.id === id)

    const addSongsToPlaylist = useCallback(async () => {
        const songs = await getFilesFromDialog()
        if (songs) {
            setPlaylistsArray((prevPlaylists) => {
                return prevPlaylists.map((playlist) => {
                    if (playlist.id === id) {
                        return {
                            ...playlist,
                            songs: [...songs, ...playlist.songs]
                        }
                    } else {
                        return playlist
                    }
                }) 
            })
        }
    },[])

    const modalContent = (
        <p>test</p>
    )

    return (
        <div className="flex gap-4 text-brand">
            <button>
                <PlayCircle className="w-10 h-10"/>
            </button>
            <button onClick={() => addSongsToPlaylist()}>
                <PlusCircle className="w-10 h-10"/>
            </button>
            <button onClick={() => setIsModalOpen(prev => !prev)}>
                <Edit className="w-10 h-10"/>
            </button>
            {
                isModalOpen && 
                <Modal 
                    title={`Editing ${targetPlaylist?.title}`}
                    content={modalContent} 
                    toggleModal={setIsModalOpen}
                />
            }
        </div>
    )
}

export default PlaylistControls