"use client"

import { useScrollPosition } from "@/hooks/use-scroll-position"
import clsx from "clsx"
import Link from "next/link"

interface NavbarProps {
  textColorTrigger?: number
}

export const Navbar = (props: NavbarProps) => {
  const { textColorTrigger } = props
  const scrollPosition = useScrollPosition()
  const colorClassName = textColorTrigger
    ? scrollPosition < textColorTrigger - 50
      ? "text-white"
      : "text-black"
    : "text-black"

  const linkClasses = "hover:font-bold"

  return (
    <div>
      <nav className='flex lg:hidden flex-col pt-10 pr-5 pl-5 pb-10'>
        <p className='font-bold text-4xl'>MOLLY STURGE</p>
        <div>
          <Link href={"/"} className={clsx(linkClasses)}>
            GALLERY
          </Link>
        </div>
        <div>
          <Link href={"/about"} className={clsx(linkClasses)}>
            BIO
          </Link>
        </div>
      </nav>
      {/* DESKTOP NAVBAR */}
      <nav
        className={clsx(
          "hidden lg:flex flex-col pt-10 pr-5 pl-5 pb-10",
          colorClassName
        )}
      >
        <p className='font-bold text-4xl'>MOLLY</p>
        <p className='font-bold text-4xl'>STURGE</p>
        <div>
          <Link href={"/"} className={clsx(linkClasses)}>
            GALLERY
          </Link>
        </div>
        <div>
          <Link href={"/about"} className={clsx(linkClasses)}>
            BIO
          </Link>
        </div>
      </nav>
    </div>
  )
}
