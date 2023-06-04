import PlaylistMeta from "../atoms/playlist-meta"

interface PlaylistHeaderProps {
    title: string | undefined;
    coverImgPath: string | undefined;
    creationDate: Date | undefined;
    songsAmount: number | undefined;
    id: string | undefined;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({coverImgPath, title, creationDate, songsAmount, id}) => {
    return (
        <header className="flex gap-7 items-center">
            <img className="w-[200px] h-[200px] drop-shadow-xl rounded-lg" src={coverImgPath}/>
            <PlaylistMeta
                title={title}
                creationDate={creationDate}
                songsAmount={songsAmount}
                id={id}
            />
        </header>
    )
}

export default PlaylistHeader