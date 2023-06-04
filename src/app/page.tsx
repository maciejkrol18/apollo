"use client";

import { AppAudioContext } from "@/contexts/app-audio-context";
import { AppAudioContextValues } from "@/ts/interfaces";
import { useContext } from "react";

export default function Home() {

	const { playlistsArray } = useContext(AppAudioContext) as AppAudioContextValues

	return (
		<div>
			<h1 className="text-5xl">Welcome to Apollo</h1>
			<p className="text-2xl mt-5">This is a placeholder</p>
			<p>This component is using the AppAudioContext</p>
			<p>Current playlist array looks like so:</p>
			<p>{JSON.stringify(playlistsArray)}</p>
		</div>
	);
}
