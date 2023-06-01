import Titlebar from "../components/organisms/titlebar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`overflow-clip ${inter.className}`}>
        <Titlebar/>
          <div className="flex flex-col mt-10 gap-24 h-screen overflow-auto">
            <div className="flex gap-32 px-20 grow">
                <aside className="flex flex-col gap-6 grow max-w-[400px]">
                  <div className="flex gap-3">
                    <button className="bg-[#161617] rounded-2xl min-h-[40px] grow">Home</button>
                    <button className="bg-[#161617] rounded-2xl min-h-[40px] grow">Settings</button>
                  </div>
                  <div className="flex flex-col grow p-8 bg-[#161617] rounded-2xl">
                    <div className="flex justify-between">
                      <h1>Playlists</h1>
                      <button>+</button>
                    </div>
                    <div className="flex flex-col gap-5">
                      <p>Playlists go here...</p>
                    </div>
                  </div>
                </aside>
                <main className="flex flex-col grow p-8 bg-[#161617] rounded-2xl">
                  {children}
                </main>
            </div>
          <div id="audio-player-placeholder" className="w-full grow max-h-[200px] bg-[#161617]">Lorem ipsum dolor sit amet.</div>
        </div>
      </body>
    </html>
  )
}
