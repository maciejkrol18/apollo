'use client';

import { appWindow } from '@tauri-apps/api/window'
import { Maximize, Minus, X } from 'lucide-react';

const Titlebar: React.FC = () => {
    return (
        <div className="flex justify-between items-center h-10 pr-2">
            <div data-tauri-drag-region className="w-full h-full"/>
            <div className='flex gap-5'>
                <button onClick={() => appWindow.minimize()}>
                    <Minus/>
                </button>
                <button onClick={() => appWindow.toggleMaximize()}>
                    <Maximize/>
                </button>
                <button onClick={() => appWindow.close()}>
                    <X/>
                </button>
            </div>
        </div>
    )
}

export default Titlebar;