import { PlaylistObject } from '@/ts/interfaces'
import PlaylistEntry from "@/components/atoms/playlist-entry";

interface PlaylistSongsProps {
    targetPlaylist: PlaylistObject | undefined;
}

const PlaylistSongs: React.FC<PlaylistSongsProps> = ({targetPlaylist}) => {
    return (
        <table className="text-left w-full">
        <tbody>
            <tr>
                <th>Index</th>
                <th>Title</th>
                <th>Date added</th>
                <th>Length</th>
            </tr>
            {targetPlaylist?.songs.map((song, idx) => (
                <PlaylistEntry
                    title={song.title}
                    convertedFilepath={song.convertedFilepath}
                    lengthInSeconds={song.lengthInSeconds}
                    dateAdded={song.dateAdded}
                    idx={idx}
                />
            ))}
        </tbody>
    </table>
    )
}

export default PlaylistSongs