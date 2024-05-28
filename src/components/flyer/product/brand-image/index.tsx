import { CSSProperties, memo, useMemo } from 'react'
import { useStaticPathForWebP } from '~/hooks/use-static-path'
import PictureWebP from '~/components/picture-webp/PictureWebP'

interface BrandImageProps {
  src: string
  alt?: string
  modifier?: 'wide'
  width?: any
  height?: any
  style?: CSSProperties
}

const BrandImageComponent = ({ src, alt, width, height, modifier, style }: BrandImageProps) => {
  const webp = useStaticPathForWebP(src)
  const isWide = modifier === 'wide'

  const getStyle = useMemo((): CSSProperties => {
    return {
      ...(style ?? {}),
      display: 'block',
      height: height ?? 20,
      width: width ?? 'auto',
      maxWidth: '100%',
      objectFit: 'contain',
      paddingRight: 8,
      position: isWide ? 'absolute' : 'inherit',
      bottom: isWide ? -10 : 'inherit',
      left: isWide ? 8 : 'inherit',
    }
  }, [height, isWide, width, style])

  return <PictureWebP src={src} webp={webp} alt={alt} style={getStyle} draggable={false} />
}

export const BrandImage = memo(BrandImageComponent)
