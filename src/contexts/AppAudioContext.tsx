"use client";
import { AppAudioContextValues } from "@/ts/interfaces";
import { createContext } from "react";
export const AppAudioContext = createContext<AppAudioContextValues | null>(
	null
);
