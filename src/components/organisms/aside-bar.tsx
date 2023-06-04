import Navigation from "../molecules/navigation"
import PlaylistsPanel from "../molecules/playlists-panel"

const AsideBar: React.FC = () => {
    return (
        <aside className="flex flex-col gap-8 xl:min-w-[250px]">
            <Navigation/>
            <PlaylistsPanel/>
        </aside>
    )
}

export default AsideBar