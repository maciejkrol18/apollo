"use client";

import { appWindow } from "@tauri-apps/api/window";
import { Maximize, Minus, X } from "lucide-react";

const Titlebar: React.FC = () => {
	return (
		<div className="flex justify-between items-center h-6 pr-2">
			<div data-tauri-drag-region className="w-full h-full" />
			<div className="flex gap-5 pt-2">
				<button onClick={() => appWindow.minimize()}>
					<Minus className="h-5 w-5" />
				</button>
				<button onClick={() => appWindow.toggleMaximize()}>
					<Maximize className="h-5 w-5" />
				</button>
				<button onClick={() => appWindow.close()}>
					<X className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
};

export default Titlebar;
