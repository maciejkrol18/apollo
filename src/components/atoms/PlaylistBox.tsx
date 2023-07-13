import Link from 'next/link'

interface PlaylistBoxProps {
    coverImgPath: string;
    title: string;
    songsAmount: number;
    id: string;
    highlight: boolean;
}

const PlaylistBox: React.FC<PlaylistBoxProps> = ({coverImgPath, title, songsAmount, id, highlight}) => {
    return (
        <Link href={`/playlists/${id}`} className="flex bg-menus-background-light rounded-lg">
            <img className="w-[40px] bg-gray-800 object-cover rounded-lg" src={coverImgPath}/>
            <div className="flex flex-col gap-1 py-2 ml-4">
                <p className={`font-semibold ${highlight ? "text-brand" : ""}`}>{title}</p>
                <p>{songsAmount} {songsAmount > 1 ? "songs" : "song"}</p>
            </div>
        </Link>
    )
}

export default PlaylistBox