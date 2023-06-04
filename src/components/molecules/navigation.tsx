import { Home, Settings } from 'lucide-react';
import Link from 'next/link'

const Navigation: React.FC = () => {
    return (
        <div className="flex flex-col gap-4 rounded-2xl text-xl bg-menus-background p-4">
            <button className="flex items-center gap-3 text-left">
                <Home/> <Link href="/">Home</Link>
            </button>
            <button className="flex items-center gap-3 text-left">
                <Settings/> <Link href="/settings">Settings</Link>
            </button>
        </div>
    )
}

export default Navigation