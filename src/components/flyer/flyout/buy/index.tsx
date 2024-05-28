import React, { memo } from 'react'
import { BuyWrapper } from '~/components/flyer/flyout/buy/buy-wrapper/BuyWrapper'
import { Ctas } from '~/components/flyer/flyout/buy/ctas/Ctas'
import { useFlyoutProductWithChildrens } from '~/hooks/use-product'

const BuyComponent: React.FC = () => {
  const { product: activeProduct } = useFlyoutProductWithChildrens()
  const price = activeProduct?.price
  if (!price) return null

  return (
    <BuyWrapper>
      <Ctas />
    </BuyWrapper>
  )
}

export const Buy = memo(BuyComponent)
