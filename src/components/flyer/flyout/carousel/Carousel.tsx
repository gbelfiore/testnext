import React, { CSSProperties, memo, useMemo } from 'react'
import { useFlyoutStore } from '~/state/flyout'
import { useFlyoutProductWithChildrens } from '~/hooks/use-product'
import { ProductImage } from '../../product/product-image/ProductImage'
import { CarouselProps } from './typings'

const CarouselComponent: React.FC<CarouselProps> = ({ height }) => {
  const { product } = useFlyoutProductWithChildrens()
  const productImage = product?.productImage

  const styleObject: CSSProperties = useMemo(() => ({
    height
  }), [height])

  if (!productImage) return null

  return (
    <div className="w-full" style={styleObject}>
      <ProductImage
        sectionIndex={useFlyoutStore.getState().activeSectionIndex ?? 0}
        productIndex={useFlyoutStore.getState().activeProductIndex ?? 0}
        dots={true}
      />
    </div>
  )
}

export const Carousel = memo(CarouselComponent)
