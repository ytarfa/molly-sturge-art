interface HeaderProps {
  imageUrl: string
}

export const Header = (props: HeaderProps) => {
  const { imageUrl } = props
  return (
    <header className='contents'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt='header'
        className='max-h-[800] object-center object-cover w-full'
      />
    </header>
  )
}
