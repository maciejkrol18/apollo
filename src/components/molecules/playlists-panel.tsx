import { PlusCircle } from "lucide-react"

const PlaylistsPanel: React.FC = () => {
    return (
        <div className="flex flex-col grow gap-6 bg-[#161617] rounded-2xl p-4">
            <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold leading">Playlists</p>
                <PlusCircle className="w-6 h-6"/>
            </div>
            <div id="playlists" className="flex grow flex-col gap-4">
                <p>Playlists go here...</p>
            </div>
        </div>
    )
}

export default PlaylistsPanel