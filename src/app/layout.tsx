import type { Metadata } from "next"
import "./globals.css"

import AnimatedCursor from "@/components/animated-cursor/lib"
import { Navbar } from "@/components/navbar/navbar"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spline_Sans } from "next/font/google"

const font = Spline_Sans({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Molly Sturge",
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
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='favicon/apple-touch-icon.png'
        ></link>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='favicon/favicon-32x32.png'
        ></link>
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='favicon/favicon-16x16.png'
        ></link>
        <link rel='manifest' href='favicon/site.webmanifest'></link>
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
