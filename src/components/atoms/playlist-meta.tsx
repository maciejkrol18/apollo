import { PlaylistObject } from "@/ts/interfaces";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"
import { Clock, Music4, FileDigit } from "lucide-react";
import { useCallback } from "react";

interface PlaylistMetaProps {
    targetPlaylist: PlaylistObject | undefined
}

const PlaylistMeta: React.FC<PlaylistMetaProps> = ({targetPlaylist}) => {

    dayjs.extend(duration)

    const formattedCreationDate = dayjs(targetPlaylist?.creationDate).format('D MMMM YYYY H:MM')
    const getTotalSongsLength = useCallback(() => {
        if (targetPlaylist) {
            let totalLength = 0
            targetPlaylist.songs.forEach((song) => {
                console.log(typeof(song.lengthInSeconds), song.lengthInSeconds)
                totalLength += Number(song.lengthInSeconds)
            })
            return dayjs.duration(totalLength, 'seconds').format('HH:mm:ss [in total]')
        }
    },[targetPlaylist])

    return (
        <div className="flex flex-col tracking-wide">
            <h1 className="text-3xl font-bold">{targetPlaylist?.title}</h1>
            <div className="flex flex-col text-lg mt-3 text-menus-foreground-muted">
                <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4"/> Created on {formattedCreationDate}
                </p>
                <p className="flex items-center gap-2">
                    <Music4 className="h-4 w-4"/> 
                    {targetPlaylist?.songs.length} {targetPlaylist?.songs.length! > 1 ? 'songs' : 'song'},  
                    {` ${getTotalSongsLength()}`}
                </p>
                <p className="flex items-center gap-2">
                    <FileDigit className="h-4 w-4"/> {targetPlaylist?.id}
                </p>
            </div>
        </div>
    )
}

export default PlaylistMeta