import { Home, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
    return (
        <div className="flex flex-col gap-4 rounded-2xl text-xl bg-[#161617] p-4">
            <button className="flex items-center gap-3 text-left">
                <Home/> Home
            </button>
            <button className="flex items-center gap-3 text-left">
                <Settings/> <a href="/settings">Settings</a>
            </button>
        </div>
    )
}

export default Navigation