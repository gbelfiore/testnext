import React from "react"
import styles from './FlyoutBody.module.css'
import { Carousel } from "~/components/flyer/flyout/carousel/Carousel"
import ProductVariantsSelectorSlider from '~/components/flyer/product/product-variants-selector-slider/ProductVariants'
import { useFlyoutStore } from "~/state/flyout"
import { Info } from "./info"
import { RefsManager } from "~/utilities/refs-manager"
import { RefKeys, RefTypes } from "~/utilities/refs-manager/enum"
import { Specs } from "~/components/flyer/flyout/specs"
import { Description } from '~/components/flyer/flyout/content/flyout-body/description'
import { Availability } from '~/components/flyer/flyout/availability/Availability'
import { Highlights } from '~/components/flyer/flyout/highlights'
import { CollapsableBlocks } from "~/components/flyer/flyout/collapsable-blocks"
import { FlyoutBodyProps } from "./typings"


export const FlyoutBody: React.FC<FlyoutBodyProps> = ({ carouselHeight }) => {
  const productVariantsRef = RefsManager.useReferencesManager({
    refKey: RefKeys.FLYOUT_PRODUCT_VARIANTS,
    type: RefTypes.DIV,
  })

  const flyoutState = useFlyoutStore.getState()
  const indexes = {
    sectionIndex: flyoutState.activeSectionIndex ?? 0,
    productIndex: flyoutState.activeProductIndex ?? 0,
  }

  return (
    <div className={styles.flyoutBody}>
      <Carousel height={carouselHeight} />
      <Info {...indexes} />
      <ProductVariantsSelectorSlider
        {...indexes}
        isExpanded
        ref={productVariantsRef}
      />
      <Specs />
      <Description />
      <Availability />
      <Highlights />
      <CollapsableBlocks />
    </div>
  )
}
