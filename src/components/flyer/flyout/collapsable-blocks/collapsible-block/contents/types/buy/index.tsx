import React, { memo } from 'react'
import { useFlyoutStore } from '~/state/flyout'
import { Ctas } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/buy/ctas/Ctas'
import { DiscountInfo } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/buy/discount-info'
import { Full } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/buy/full'
import { Discount } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/buy/discount'
import { Discounted } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/buy/discounted'
import { type ICollapsibleSectionContentDataOpt } from '~/typings/schemaopt'
import { usePrice } from '~/hooks/use-price'
import { useProductWithChildrens } from '~/hooks/use-product'
import useSection from '~/hooks/use-section'
import useTemplateComponent from '~/hooks/use-template-component'
import useTemplate from '~/hooks/use-template'

const BuyComponent: React.FC<ICollapsibleSectionContentDataOpt['buy']> = () => {
  const price = useFlyoutStore((state) => state.activeProduct?.price)
  const { activeSectionIndex, activeProductIndex } = useFlyoutStore((state) => state)
  const section = useSection(activeSectionIndex)
  const { product } = useProductWithChildrens(activeSectionIndex, activeProductIndex)
  const templateComponentPrice = useTemplateComponent('price', section, product)

  const template = useTemplate(section)

  const { full } = usePrice(price, templateComponentPrice)

  if (!price) return null

  return (
    <div className="flex">
      <div
        style={{
          width: 140,
        }}
      >
        {price.full && (
          <DiscountInfo template={template} priceTagTopBorderColor={price.priceTagTopBorderColor}>
            <Full template={template} fullPrice={price.full} hasLineThrough={full.hasLineThrough} priceTagTopTextColor={price.priceTagTopTextColor} />

            {price.discount && (
              <Discount
                priceTagTopBorderColor={price.priceTagTopBorderColor}
                priceTagTopTextColor={price.priceTagTopTextColor}
                priceTagTopBackgroundColor={price.priceTagTopBackgroundColor}
                priceTagBackgroundColor={price.priceTagBackgroundColor}
                priceDiscount={price.discount.replace(/%$/, '')}
              />
            )}
          </DiscountInfo>
        )}

        <Discounted
          template={template}
          discountedPriceColor={price.discountedPriceColor}
          discountedPriceStrokeWidth={price.discountedPriceStrokeWidth}
          discountedPriceStrokeColor={price.discountedPriceStrokeColor}
          discountedPriceShadowColor={price.discountedPriceShadowColor}
          priceTagBackgroundColor={price.priceTagBackgroundColor}
          discounted={price.discounted}
        />
      </div>
      <Ctas />
    </div>
  )
}

export const Buy = memo(BuyComponent)
