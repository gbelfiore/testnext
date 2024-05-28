import { CSSProperties, memo, useMemo } from 'react'
import { useStaticPath, useStaticPathForWebP } from '~/hooks/use-static-path'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import { useProductWithChildrens } from '~/hooks/use-product'

interface BrandImageProps {
  sectionIndex: number
  productIndex: number
  productBundleIndex?: number | null
  isMergeStyle?: boolean
  style?: CSSProperties
}

const BrandImageComponent = ({ sectionIndex, productIndex, productBundleIndex, isMergeStyle = false, style }: BrandImageProps) => {
  const { product } = useProductWithChildrens(sectionIndex, productIndex, productBundleIndex)
  const brandText = product?.brandText
  const brandImageWidth = product?.brandImageWidth ?? 'auto'
  const brandImageHeight = product?.brandImageHeight ?? 15
  const brandImageMargin = product?.brandImageMargin ?? 0
  const brandAlt = product?.name ?? brandText

  const brandImageSrc = useStaticPath(product?.brandImage)
  const brandImageSrcWebp = useStaticPathForWebP(brandImageSrc)

  const getStyle = useMemo((): CSSProperties => {
    let styleDefult: CSSProperties = {
      ...(brandImageMargin ? { margin: brandImageMargin } : {}),
      height: brandImageHeight,
      width: brandImageWidth,
      maxWidth: '80%',
      objectFit: 'contain',
    }

    if (style) {
      if (isMergeStyle) {
        styleDefult = { ...styleDefult, ...style }
      } else {
        styleDefult = style
      }
    }
    return styleDefult
  }, [brandImageHeight, brandImageMargin, brandImageWidth, isMergeStyle, style])

  return <PictureWebP src={brandImageSrc} webp={brandImageSrcWebp} alt={brandAlt} style={getStyle} draggable={false} />
}

export const BrandImage = memo(BrandImageComponent)
