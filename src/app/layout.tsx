"use client";

import TailwindIndicator from "@/components/atoms/tailwind-indicator";
import Titlebar from "@/components/atoms/titlebar";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle } from 'lucide-react';
import AppAudio from "@/components/organisms/app-audio";
import AsideBar from "@/components/organisms/aside-bar";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  return (
    <html lang="en">
      <body className={`overflow-clip text-menus-foreground bg-body ${plusJakartaSans.className}`}>
        <Titlebar/>
        <TailwindIndicator/>
          <div className="flex flex-col mt-7 gap-14 h-screen overflow-auto">
          <AppAudio>
            <div className="flex grow gap-8 px-4">
              <AsideBar/>
              <main className="flex flex-col rounded-2xl grow bg-menus-background p-8">
                <div className="w-full mb-4">
                  <button onClick={() => router.back()}>
                    <ArrowLeftCircle className="text-slate-700 h-10 w-10"/>
                  </button>
                </div>
                {children}
              </main>
            </div>
            <div id="audio-player-placeholder" className="w-full grow max-h-[200px] bg-menus-background">
              Lorem, ipsum dolor.
              <audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" controls/>
            </div>
          </AppAudio>
        </div>
      </body>
    </html>
  )
}
