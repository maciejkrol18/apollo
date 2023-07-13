import Navigation from "../molecules/Navigation"
import PlaylistsPanel from "../molecules/PlaylistsPanel"

const AsideBar: React.FC = () => {
    return (
        <aside className="flex flex-col gap-2 xl:min-w-[250px]">
            <Navigation/>
            <PlaylistsPanel/>
        </aside>
    )
}

export default AsideBar