import { type SanityDocument } from "next-sanity"

import { Header } from "@/components/header/header"
import { Navbar } from "@/components/navbar/navbar"
import { VerticalGallery } from "@/components/vertical-gallery/vertical-gallery"
import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import {
  SanityImageSource,
  SanityProjectDetails,
} from "@sanity/image-url/lib/types/types"

interface Piece {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  image: SanityImageSource
  year: string
}

const PIECES_QUERY = `*[
  _type == "piece"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, year}`

const HEADER_IMAGE_QUERY = `*[_type == "headerImage"][0]`

const getUrl = (
  source: SanityImageSource,
  sanityProjectDetails: SanityProjectDetails
) => {
  return imageUrlBuilder(sanityProjectDetails).image(source)
}

const options = { next: { revalidate: 30 } }

export default async function ArtworksPage() {
  const pieces = await client.fetch<SanityDocument<Piece>[]>(
    PIECES_QUERY,
    {},
    options
  )
  const headerImage = await client.fetch<SanityDocument>(
    HEADER_IMAGE_QUERY,
    {},
    options
  )

  if (!pieces || !headerImage) {
    throw new Error("pieces and headerImage are required")
  }

  const { projectId, dataset } = client.config()
  if (!projectId || !dataset) {
    throw new Error("projectId and dataset are required")
  }
  const headerImageUrl = getUrl(headerImage.image, { projectId, dataset }).url()
  const galleryItems = pieces.map((piece) => {
    const pieceImageUrl = getUrl(piece.image, { projectId, dataset }).url()

    return {
      title: piece.title,
      imageUrl: pieceImageUrl,
      link: `/piece/${piece.slug.current}`,
      year: piece.year,
    }
  })

  return (
    <div>
      <Navbar />
      <div>
        <Header imageUrl={headerImageUrl} />
        <div className='pt-16 pb-16 flex justify-center'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <VerticalGallery items={galleryItems} />
      </div>
    </div>
  )
}
