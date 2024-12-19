import type { Metadata } from "next"
import "./globals.css"

import { Navbar } from "@/components/navbar/navbar"
import { Roboto } from "next/font/google"

const font = Roboto({ weight: "400" })

export const metadata: Metadata = {
  title: "Molly Sturge Art",
  description: "",
}

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
        {/* <AnimatedCursor
          clickables={[
            {
              target: "img",
              color: "255, 255, 255",
            },
          ]}
        /> */}
        <Navbar />
        <main className='pr-10 pl-10 pb-10 lg:pt-10 lg:pb-10 lg:pl-16 lg:pr-16 md:grow'>
          {children}
        </main>
      </body>
    </html>
  )
}
