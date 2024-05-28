import React, { useMemo } from 'react'

import { Backdrop } from '~/components/flyer/flyout/backdrop/Backdrop'
import { Container } from '~/components/flyer/flyout/container'
import { MobileContent } from '~/components/flyer/flyout/flyout-mobile/mobile-content'
import { Ctas as PriceButtons } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/buy/ctas/Ctas'
import { useFlyoutStore } from '~/state/flyout'
import ProductUtils from '~/utilities/product/ProductUtils'
import ContentBundle from '../content-bundle'
import { BottomWrapper } from '../flyout-desktop'
import { useFlyoutCtas } from '~/hooks/use-flyout-ctas'

const FlyoutMobileComponent = () => {
  const currentProduct = useFlyoutStore((state) => state.activeProduct)
  const isBundle = currentProduct && ProductUtils.checkBundleProduct(currentProduct)
  const hasCtas = useFlyoutCtas().length > 0

  const getFooterChildren = useMemo(() => {
    if (!isBundle) return null
    if (!hasCtas) return null

    return (
      <BottomWrapper>
        <PriceButtons isVertical={false} />
      </BottomWrapper>
    )
  }, [isBundle, hasCtas])

  return (
    <Container>
      <Backdrop />
      <MobileContent footerChildren={getFooterChildren}>{isBundle && <ContentBundle paddingProductTab='12px' />}</MobileContent>
    </Container>
  )
}

const FlyoutMobile = FlyoutMobileComponent
export default FlyoutMobile
