import dayjs from "dayjs";
import { Clock, Music4, FileDigit } from "lucide-react";

interface PlaylistMetaProps {
    title: string | undefined;
    creationDate: Date | undefined;
    songsAmount: number | undefined;
    id: string | undefined;
}

const PlaylistMeta: React.FC<PlaylistMetaProps> = ({title, creationDate, songsAmount, id}) => {

    const formattedCreationDate = dayjs(creationDate).format('D MMMM YYYY H:MM')

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex flex-col text-lg mt-3 text-menus-foreground-muted">
                <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4"/> Created on {formattedCreationDate}
                </p>
                <p className="flex items-center gap-2">
                    <Music4 className="h-4 w-4"/> {songsAmount} {songsAmount! > 1 ? 'songs' : 'song'}
                </p>
                <p className="flex items-center gap-2">
                    <FileDigit className="h-4 w-4"/> {id}
                </p>
            </div>
        </div>
    )
}

export default PlaylistMeta