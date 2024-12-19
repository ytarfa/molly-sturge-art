import type { Metadata } from "next"
import "./globals.css"

import { Navbar } from "@/components/navbar/navbar"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Roboto } from "next/font/google"
import AnimatedCursor from "react-animated-cursor"

const font = Roboto({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Molly Sturge Art",
  description: "",
}

library.add(faPlus)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body
        className={`${font.className} antialiased flex lg:flex-row flex-col`}
      >
        <AnimatedCursor
          innerSize={8}
          outerSize={8}
          color='0,0,0'
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          innerStyle={{
            mixBlendMode: "difference",
          }}
          clickables={[
            {
              target: ".cursor-plus",
              children: [
                <FontAwesomeIcon
                  key={"faPlus"}
                  icon={faPlus}
                  className='h-4'
                />,
              ],
              innerStyle: {
                fontSize: "24px",
                color: "black",
              },
            },
            {
              target: ".cursor-x",
              children: [
                <FontAwesomeIcon
                  key={"faTimes"}
                  icon={faPlus}
                  className='h-4 rotate-45'
                />,
              ],
              innerStyle: {
                fontSize: "24px",
                color: "black",
              },
            },
            {
              target: ".cursor-hover",
              innerSize: 0,
            },
          ]}
        />
        <Navbar />
        <main className='pr-10 pl-10 pb-10 lg:pt-10 lg:pb-10 lg:pl-16 lg:pr-16 md:grow'>
          {children}
        </main>
      </body>
    </html>
  )
}
