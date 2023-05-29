'use client';

import { useCallback } from "react";
import { Maximize, Minus, X } from 'lucide-react';

const Titlebar: React.FC = () => {

    const minimizeWindow = useCallback(async () => {
        const { appWindow } = await import("@tauri-apps/plugin-window");
        appWindow?.minimize();
    }, [])
    
    const maximizeWindow = useCallback(async () => {
        const { appWindow } = await import("@tauri-apps/plugin-window");
        const isMaximized = await appWindow?.isMaximized();
    
        if (isMaximized) {
            appWindow?.unmaximize();
        } else {
            appWindow?.maximize();
        }
    }, [])
    
    const closeWindow = useCallback(async () => {
        const { appWindow } = await import("@tauri-apps/plugin-window");
        appWindow.close();
    }, [])

    return (
        <div className="flex justify-between items-center h-10 pr-2">
            <div data-tauri-drag-region className="w-full h-full"></div>
            <div className='flex gap-3'>
                <button onClick={minimizeWindow}>
                    <Minus/>
                </button>
                <button onClick={maximizeWindow}>
                    <Maximize/>
                </button>
                <button onClick={closeWindow}>
                    <X/>
                </button>
            </div>
        </div>
    )
}

export default Titlebar;