import { Home, Settings } from "lucide-react";
import Link from "next/link";

const Navigation: React.FC = () => {
	return (
		<div className="flex flex-col gap-4 rounded-2xl text-xl bg-menus-background p-4">
			<Link className="flex items-center gap-3 text-left" href="/">
				<Home /> Home
			</Link>
			<Link className="flex items-center gap-3 text-left" href="/settings">
				<Settings /> Settings
			</Link>
		</div>
	);
};

export default Navigation;
