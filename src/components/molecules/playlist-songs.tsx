import { PlaylistObject } from '@/ts/interfaces'
import PlaylistEntry from "@/components/atoms/playlist-entry";

interface PlaylistSongsProps {
    targetPlaylist: PlaylistObject | undefined;
}

const PlaylistSongs: React.FC<PlaylistSongsProps> = ({targetPlaylist}) => {
    return (
        <div className="flex flex-col mt-10 border-t-[#67646420] border-t-2 pt-2">
            <table className="text-left w-full">
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Date added</th>
                        <th>Length</th>
                    </tr>
                    {targetPlaylist?.songs.map((song, idx) => (
                        <PlaylistEntry
                            key={idx}
                            song={song}
                            playlist={targetPlaylist}
                            idx={idx}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PlaylistSongs