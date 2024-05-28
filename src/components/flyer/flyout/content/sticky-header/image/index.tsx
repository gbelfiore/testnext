import React, { useMemo } from 'react'
import { useProductWithChildrens } from '~/hooks/use-product'
import { getStaticPath, getStaticPathForWebP } from '~/hooks/use-static-path'
import PictureWebP from '~/components/picture-webp/PictureWebP'


export const StickyHeaderImage: React.FC<{ sectionIndex: number, productIndex: number }> = ({ sectionIndex, productIndex }) => {
  const { product } = useProductWithChildrens(sectionIndex, productIndex)
  const productImage = product?.productImage
  const image = useMemo(() => getStaticPath(productImage), [productImage])
  const imageWebP = useMemo(() => getStaticPathForWebP(productImage), [productImage])

  return (
    <PictureWebP
      className="w-full h-full object-contain"
      src={image}
      webp={imageWebP}
    />
  )
}
