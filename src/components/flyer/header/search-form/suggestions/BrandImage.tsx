import { CSSProperties, memo, useMemo } from 'react'
import { useStaticPathForWebP } from '~/hooks/use-static-path'
import PictureWebP from '~/components/picture-webp/PictureWebP'

interface BrandImageProps {
  src: string
  alt?: string
  draggable?: boolean
}

const BrandImageComponent = ({ src, alt, draggable }: BrandImageProps) => {
  const webp = useStaticPathForWebP(src)

  const getStyle = useMemo((): CSSProperties => {
    return {
      width: '100%',
      height: 16,
      marginBottom: 4,
      objectFit: 'contain',
      objectPosition: 'left center',
    }
  }, [])

  return <PictureWebP src={src} webp={webp} alt={alt} style={getStyle} draggable={draggable} />
}

export const BrandImage = memo(BrandImageComponent)
