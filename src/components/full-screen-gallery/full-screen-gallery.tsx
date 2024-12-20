"use client"
import clsx from "clsx"
import { useMemo, useState } from "react"

interface FullScreenGalleryItem {
  imageUrl: string
  title: string
  subtitle: string
  imagesUrls?: string[]
}

interface GalleryItemProps {
  fullScreenGalleryItem: FullScreenGalleryItem
  visible: boolean
  next: () => void
  prev: () => void
  setFullScreenImageUrl: (url: string) => void
  current: number
  count: number
}

interface FullScreenGalleryProps {
  items: FullScreenGalleryItem[]
}

const GalleryItem = (props: GalleryItemProps) => {
  const {
    fullScreenGalleryItem,
    visible,
    next,
    prev,
    current,
    count,
    setFullScreenImageUrl,
  } = props

  const visibilityClass = visible ? "block" : "hidden"

  const smallGalleryItems = fullScreenGalleryItem.imagesUrls?.map(
    (imageUrl) => (
      <img
        key={imageUrl}
        src={imageUrl}
        alt={fullScreenGalleryItem.title}
        onClick={() => setFullScreenImageUrl(imageUrl)}
        className='cursor-pointer max-h-[200px] lg:max-h-[300px] object-contain cursor-plus'
      />
    )
  )

  return (
    <div className={visibilityClass}>
      {/* Main Gallery Item */}
      <div className={clsx("h-full flex flex-col gap-y-2 m-auto")}>
        <div className='flex-shrink-0'>
          <button
            onClick={prev}
            className='cursor-none cursor-hover hover:font-bold'
          >
            Prev
          </button>
          <p className='inline'> / </p>
          <button
            onClick={next}
            className='cursor-none cursor-hover hover:font-bold'
          >
            Next
          </button>
          <p className='inline ml-2 text-slate-500'>
            ({current + 1} of {count})
          </p>
        </div>
        <div className='flex-grow flex overflow-hidden'>
          <img
            src={fullScreenGalleryItem.imageUrl}
            alt={fullScreenGalleryItem.title}
            className='max-w-full max-h-full lg:max-h-[80vh] lg:max-w-[75vw] object-contain cursor-plus'
            onClick={() =>
              setFullScreenImageUrl(fullScreenGalleryItem.imageUrl)
            }
          />
        </div>
        <div>
          <p className='flex-shrink-0'>{fullScreenGalleryItem.title}</p>
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
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState<string>("")

  const galleryItems = items.map((item) => (
    <GalleryItem
      key={item.imageUrl}
      fullScreenGalleryItem={item}
      visible={currentItemIndex === items.indexOf(item)}
      next={() => {
        setCurrentItemIndex(
          currentItemIndex === items.length - 1 ? 0 : currentItemIndex + 1
        )
      }}
      prev={() => {
        setCurrentItemIndex(
          currentItemIndex === 0 ? items.length - 1 : currentItemIndex - 1
        )
      }}
      setFullScreenImageUrl={setFullScreenImageUrl}
      current={currentItemIndex}
      count={items.length}
    />
  ))

  const fullScreenImage = useMemo(() => {
    return fullScreenImageUrl ? (
      <img src={fullScreenImageUrl} className='m-auto max-h-full max-w-full' />
    ) : null
  }, [fullScreenImageUrl])

  return (
    <div>
      {galleryItems}
      <div
        className={clsx([
          "top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 p-10 cursor-x",
          fullScreenImageUrl ? "fixed" : "hidden",
        ])}
        onClick={() => setFullScreenImageUrl("")}
      >
        {fullScreenImage}
      </div>
    </div>
  )
}
