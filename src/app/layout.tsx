"use client";

import TailwindIndicator from "@/components/atoms/TailwindIndicator";
import Titlebar from "@/components/atoms/Titlebar";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";
import AppAudio from "@/components/atoms/AppAudio";
import AsideBar from "@/components/organisms/AsideBar";
import AudioBar from "@/components/molecules/AudioBar";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <html lang="en">
      <body className={`text-menus-foreground bg-body ${plusJakartaSans.className}`}>
        <Titlebar />
        <TailwindIndicator />
        <div
          style={{ height: "calc(100vh - 40px)" }}
          className="flex flex-col gap-2 mt-4"
        >
          <AppAudio>
            <div className="flex grow gap-2 px-2 max-h-[828px]">
              <AsideBar />
              <main className="flex flex-col overflow-auto rounded-2xl grow bg-menus-background p-8">
                <div className="w-full mb-4">
                  <button onClick={() => router.back()}>
                    <ArrowLeftCircle className="text-slate-700 h-10 w-10" />
                  </button>
                </div>
                {children}
              </main>
            </div>
            <AudioBar />
          </AppAudio>
        </div>
      </body>
    </html>
  );
}
