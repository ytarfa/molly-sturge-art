"use client"

import clsx from "clsx"
import { useState } from "react"

interface HorizontalGalleryItem {
  imageUrl: string
  title: string
  year?: string
  show: boolean
}

interface HorizontalGalleryProps {
  items: HorizontalGalleryItem[]
}

const HorizontalGalleryItem = (props: HorizontalGalleryItem) => {
  const { imageUrl, title, year, show } = props

  const displayClass = show ? "absolute" : "hidden"

  return (
    <div className={clsx("w-full h-full top-0 left-0", displayClass)}>
      <img src={imageUrl} alt={title} className='' />
    </div>
  )
}

export const HorizontalGallery = (props: HorizontalGalleryProps) => {
  const { items } = props

  const [currentItem, setCurrentItem] = useState(0)

  const prev = () => {
    if (currentItem === 0) {
      setCurrentItem(items.length - 1)
    } else {
      setCurrentItem(currentItem - 1)
    }
  }

  const next = () => {
    if (currentItem === items.length - 1) {
      setCurrentItem(0)
    } else {
      setCurrentItem(currentItem + 1)
    }
  }

  const galleryItems = items.map((item) => (
    <HorizontalGalleryItem
      key={item.imageUrl}
      imageUrl={item.imageUrl}
      title={item.title}
      show={currentItem === items.indexOf(item)}
    />
  ))

  return (
    <div>
      <div>{galleryItems}</div>
      <button className='absolute bottom-0 left-0' onClick={prev}>
        Prev
      </button>
      <button className='absolute bottom-0 right-0' onClick={next}>
        Next
      </button>
    </div>
  )
}
