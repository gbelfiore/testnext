import { CSSProperties, memo } from 'react'
import { useProductWithChildrens } from '~/hooks/use-product'
import { BrandImage } from './brand-image/BrandImage'
import { BrandText } from './brand-name/BrandName'

interface BrandProps {
  sectionIndex: number | null
  productIndex: number | null
  productBundleIndex?: number | null
  isMergeStyleImage?: boolean
  styleBrandImage?: CSSProperties
  isMergeStyleText?: boolean
  styleBrandText?: CSSProperties
}

const BrandComponent = ({
  sectionIndex,
  productIndex,
  productBundleIndex,
  styleBrandImage,
  styleBrandText,
  isMergeStyleImage = false,
  isMergeStyleText = false,
}: BrandProps) => {
  const { product } = useProductWithChildrens(sectionIndex, productIndex, productBundleIndex)
  if (sectionIndex == null || productIndex == null || !product) return null

  return product.brandImage ? (
    <BrandImage
      sectionIndex={sectionIndex}
      productIndex={productIndex}
      productBundleIndex={productBundleIndex}
      style={styleBrandImage}
      isMergeStyle={isMergeStyleImage}
    />
  ) : (
    <BrandText
      sectionIndex={sectionIndex}
      productIndex={productIndex}
      productBundleIndex={productBundleIndex}
      style={styleBrandText}
      isMergeStyle={isMergeStyleText}
    />
  )
}

export const Brand = memo(BrandComponent)
