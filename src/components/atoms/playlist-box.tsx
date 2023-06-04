import { StaticImageData } from "next/image";

interface PlaylistBoxProps {
    coverImgPath: StaticImageData;
    title: string;
    songsAmount: number;
    id: string;
}

const PlaylistBox: React.FC<PlaylistBoxProps> = ({coverImgPath, title, songsAmount, id}) => {
    return (
        <a href={`/playlists/${id}`} className="flex bg-menus-background-light rounded-lg">
            <img className="w-[40px] object-cover rounded-l-lg" src={typeof(coverImgPath) === "object" ? coverImgPath.src : coverImgPath}/>
            <div className="flex flex-col gap-1 py-2 ml-2">
                <p className="font-semibold">{title}</p>
                <p>{songsAmount} songs</p>
            </div>
        </a>
    )
}

export default PlaylistBox