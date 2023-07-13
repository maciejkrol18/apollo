"use client";

const SettingsPage: React.FC = () => {
	return (
		<div>
			<h1 className="text-5xl">App settings</h1>
			<button
				onClick={() => {
					localStorage.clear();
					window.location.reload();
				}}
			>
				Wipe localStorage
			</button>
		</div>
	);
};

export default SettingsPage;
