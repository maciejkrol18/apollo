import { PlaylistSong } from "@/ts/interfaces"
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"

interface PlaylistEntryProps {
    title: string;
    convertedFilepath: string;
    lengthInSeconds: number;
    dateAdded: Date;
    idx: number;
}

const PlaylistEntry: React.FC<PlaylistEntryProps> = ({title, convertedFilepath, lengthInSeconds, dateAdded, idx}) => {

    dayjs.extend(duration)
    const formattedDateAdded = dayjs(dateAdded).format('DD.MM.YYYY')
    const formattedSeconds = dayjs.duration(lengthInSeconds, 'seconds').format('mm:ss')

    return (
        <tr>
            <td className="py-2">{idx+1}</td>
            <td className="py-2">{title}</td>
            <td className="py-2">{formattedDateAdded}</td>
            <td className="py-2">{formattedSeconds}</td>
        </tr>
    )
}

export default PlaylistEntry