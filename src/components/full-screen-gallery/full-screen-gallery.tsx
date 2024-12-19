"use client"
import clsx from "clsx"
import { useState } from "react"

interface FullScreenGalleryItem {
  imageUrl: string
  title: string
  year: string
  subtitle: string
  imagesUrls?: string[]
}

interface GalleryItemProps {
  fullScreenGalleryItem: FullScreenGalleryItem
  visible: boolean
  next: () => void
  prev: () => void
  current: number
  count: number
}

interface FullScreenGalleryProps {
  items: FullScreenGalleryItem[]
}

const GalleryItem = (props: GalleryItemProps) => {
  const { fullScreenGalleryItem, visible, next, prev, current, count } = props

  const visibilityClass = visible ? "block" : "hidden"

  const smallGalleryItems = fullScreenGalleryItem.imagesUrls?.map(
    (imageUrl) => (
      <img
        key={imageUrl}
        src={imageUrl}
        alt={fullScreenGalleryItem.title}
        className='cursor-pointer max-h-[200px] lg:max-h-[300px] object-contain'
      />
    )
  )

  return (
    <div className={visibilityClass}>
      {/* Main Gallery Item */}
      <div className={clsx("h-full flex flex-col gap-y-2 m-auto")}>
        <div className='flex-shrink-0'>
          <button onClick={prev}>Prev </button>
          <p className='inline'> / </p>
          <button onClick={next}> Next </button>
          <p className='inline ml-2 text-slate-500'>
            ({current} of {count})
          </p>
        </div>
        <div className='flex-grow flex overflow-hidden'>
          <img
            src={fullScreenGalleryItem.imageUrl}
            alt={fullScreenGalleryItem.title}
            className='max-w-full max-h-full lg:max-h-[80vh] lg:max-w-[75vw] object-contain'
          />
        </div>
        <div>
          <p className='flex-shrink-0'>
            {fullScreenGalleryItem.year} | {fullScreenGalleryItem.title}
          </p>
          <p className='text-xs text-slate-500'>
            {fullScreenGalleryItem.subtitle}
          </p>
        </div>
      </div>
      {/* Small Gallery Items */}
      <div className='flex flex-row gap-5 w-full mt-10 flex-wrap'>
        {smallGalleryItems}
      </div>
    </div>
  )
}

export const FullScreenGallery = (props: FullScreenGalleryProps) => {
  const { items } = props

  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  const galleryItems = items.map((item) => (
    <GalleryItem
      key={item.imageUrl}
      fullScreenGalleryItem={item}
      visible={currentItemIndex === items.indexOf(item)}
      next={() => {
        setCurrentItemIndex((currentItemIndex + 1) % items.length)
      }}
      prev={() => {
        setCurrentItemIndex(
          currentItemIndex === 0 ? items.length - 1 : currentItemIndex - 1
        )
      }}
      current={currentItemIndex}
      count={items.length}
    />
  ))

  return galleryItems
}
