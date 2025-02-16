import { type SanityDocument } from "next-sanity"

import { FullScreenGallery } from "@/components/full-screen-gallery/full-screen-gallery"
import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import {
  SanityImageSource,
  SanityProjectDetails,
} from "@sanity/image-url/lib/types/types"

interface Piece {
  _id: string
  title: string
  publishedAt: string
  image: SanityImageSource
  subtitle: string
  images: SanityImageSource[]
  order: number
}

const PIECES_QUERY = `*[
  _type == "piece"
]|order(publishedAt desc)[0...12]{_id, title, publishedAt, image, subtitle, images, order}`

const getUrl = (
  source: SanityImageSource,
  sanityProjectDetails: SanityProjectDetails
) => {
  return imageUrlBuilder(sanityProjectDetails).image(source)
}

const options = { next: { revalidate: 30 } }

export default async function IndexPage() {
  const pieces = await client.fetch<SanityDocument<Piece>[]>(
    PIECES_QUERY,
    {},
    options
  )

  if (!pieces) {
    throw new Error("pieces and headerImage are required")
  }

  const { projectId, dataset } = client.config()
  if (!projectId || !dataset) {
    throw new Error("projectId and dataset are required")
  }
  const galleryItems = pieces
    .sort((a, b) => a.order - b.order)
    .map((piece) => {
      const pieceImageUrl = getUrl(piece.image, { projectId, dataset }).url()

      return {
        title: piece.title,
        imageUrl: pieceImageUrl,
        subtitle: piece.subtitle,
        imagesUrls: piece.images
          ? piece.images.map((image) => {
              const imageUrl = getUrl(image, { projectId, dataset }).url()
              return imageUrl
            })
          : [],
      }
    })

  return (
    <div>
      <FullScreenGallery items={galleryItems} />
    </div>
  )
}
