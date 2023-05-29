import Titlebar from "../components/organisms/titlebar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`overflow-clip ${inter.className}`}>
        <Titlebar/>
        <div className="h-screen overflow-clip">
          <div className="h-screen overflow-auto border-slate-900 pb-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
