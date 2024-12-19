import clsx from "clsx"
import Link from "next/link"

interface VerticalGalleryItem {
  imageUrl: string
  title: string
  year?: string
  link?: string
}

interface VerticalGalleryProps {
  items: VerticalGalleryItem[]
}

const GalleryItem = (props: VerticalGalleryItem) => {
  const { imageUrl, title, link, year } = props

  const animationClasses = "hover:scale-[0.99] transition-all"

  const galleryItemContainerClasses = "w-full"

  const GalleryItemContainer = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return link ? (
      <div className={galleryItemContainerClasses}>
        <Link href={link} className={clsx("m-10 block", animationClasses)}>
          {children}
        </Link>
      </div>
    ) : (
      <div className={clsx(galleryItemContainerClasses, animationClasses)}>
        {children}
      </div>
    )
  }

  return (
    <GalleryItemContainer>
      <div className='flex flex-col gap-y-2'>
        <div className='flex flex-row-reverse'>
          <p>
            {year} | {title}
          </p>
        </div>
        {/* TODO: use next.js Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={title} className='' />
      </div>
    </GalleryItemContainer>
  )
}

export const VerticalGallery = (props: VerticalGalleryProps) => {
  const { items } = props
  const galleryItems = items.map((item) => (
    <GalleryItem
      key={item.imageUrl}
      imageUrl={item.imageUrl}
      title={item.title}
      link={item.link}
      year={item.year}
    />
  ))
  return <div className='w-1/2 flex-col m-auto'>{galleryItems}</div>
}
