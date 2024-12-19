import { client } from "@/sanity/client"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faInstagramSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import { SanityDocument } from "next-sanity"
import Link from "next/link"

library.add(faInstagramSquare, faLinkedin)

interface AboutText {
  aboutText: string
}

interface ContactInfo {
  phoneNumber: string
  email: string
  instagramLink: string
  linkedinLink: string
}

const ABOUT_TEXT_QUERY = `*[_type == "aboutText"]`
const CONTACT_INFO_QUERY = `*[_type == "contactInfo"]`
const options = { next: { revalidate: 30 } }

export default async function AboutPage() {
  const aboutText = await client.fetch<SanityDocument<AboutText[]>>(
    ABOUT_TEXT_QUERY,
    {},
    options
  )

  const contactInfo = await client.fetch<SanityDocument<ContactInfo[]>>(
    CONTACT_INFO_QUERY,
    {},
    options
  )

  const linkClasses = "underline hover:font-bold cursor-none cursor-hover"

  return (
    <div className='max-w-[800px]'>
      <img className=' mb-10' src='/molly-sturge.jpeg' alt='Molly Sturge' />
      <p className=''>{aboutText[0].aboutText}</p>
      <p className='font-bold mt-5'>Contact</p>
      <ul>
        <li> {contactInfo[0].phoneNumber} </li>
        <li>
          {" "}
          <Link
            href={`mailto:${contactInfo[0].email}`}
            passHref
            className={linkClasses}
          >
            {contactInfo[0].email}
          </Link>
        </li>
        <li>
          <Link
            href={contactInfo[0].instagramLink}
            passHref
            className={linkClasses}
          >
            Instagram
          </Link>
        </li>
        <li>
          <Link
            href={contactInfo[0].linkedinLink}
            passHref
            className={linkClasses}
          >
            LinkedIn
          </Link>
        </li>
      </ul>
    </div>
  )
}
