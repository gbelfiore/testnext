import React, { useEffect, useMemo, useState } from 'react'
import { type PriceTagProps } from '~/components/flyer/flyout/buy/price-tag/typings'
import { useFlyoutStore } from '~/state/flyout'
import useSection from '~/hooks/use-section'
import { getTemplate } from '~/hooks/use-template'
import useTemplateComponent from '~/hooks/use-template-component'
import { useProductWithChildrens } from '~/hooks/use-product'
import { usePrice } from '~/hooks/use-price'
import { getFontInfoOnPrice } from '~/hooks/use-font-info'
import { PriceBlock } from '@doveconviene/next-format-ui-lib'
import { Badge } from '~/components/badge/Badge'
import { useSchemaStore } from '~/state/schema'
import { RefsManager } from '~/utilities/refs-manager'
import { RefKeys, RefTypes } from '~/utilities/refs-manager/enum'

/**
 * Using transform scale is problematic. This is a workarround to make the height of the PB work as expected.
 */
function useComputePbDynamicHeight (initialHeight: number) {
  const priceBlock = RefsManager.getRef<HTMLDivElement>(RefKeys.FLYOUT_PRICE_BLOCK)?.ref
  const [pbHeight, setPbHeight] = useState<number>(initialHeight)

  useEffect(() => {
    if (!priceBlock) return

    let lastValue = -1
    let sameValueTimes = 0

    const interval = setInterval(() => {
      const child = priceBlock.firstElementChild?.firstElementChild
      if (!child) return
      const value = child.getBoundingClientRect().height

      if (value === lastValue) {
        sameValueTimes += 1

        if (sameValueTimes >= 3) clearInterval(interval)
      } else {
        sameValueTimes = 0
        lastValue = value
        setPbHeight(value)
      }
    }, 50)

    return () => {
      clearInterval(interval)
    }
  }, [priceBlock])

  return pbHeight
}

const mapFormatTypeScale: Record<string, number> = {
  type2: 1.45,
  type4: 1.13,
  type7: 1.3,
  type10: 1.15,
  type12: 1.15,
  type13: 1.2,
  type14: 1.2,
  type15: 1.2,
  default: 1.25,
}

const pbWidth = 140
const pbInitialHeight = 110

const PriceTag: React.FC<PriceTagProps> = ({ price, className, priceBlockTransformOrigin }) => {
  const ref = RefsManager.useReferencesManager<HTMLDivElement>({
    refKey: RefKeys.FLYOUT_PRICE_BLOCK,
    type: RefTypes.DIV,
  })

  const { activeSectionIndex, activeProductIndex } = useFlyoutStore((state) => state)
  const schema = useSchemaStore.getState().schema
  const section = useSection(activeSectionIndex)
  const { product } = useProductWithChildrens(activeSectionIndex, activeProductIndex)
  //const product = useProduct(activeSectionIndex, activeProductIndex)
  const template = getTemplate(schema, section)
  const templateComponentPrice = useTemplateComponent('price', section, product)

  const { full, discounted, separators } = usePrice(product?.price, templateComponentPrice)

  const fontInfoPiceBlock = getFontInfoOnPrice(
    'priceTagDiscounted',
    {
      letterSpacing: '-1.5px',
      fontWeight: 600,
      fontFamily: template?.fonts?.families?.[0]?.name,
    },
    template,
    templateComponentPrice
  )

  const fontInfoDiscount = getFontInfoOnPrice('discount', undefined, template, templateComponentPrice)
  const fontInfoDiscounted = getFontInfoOnPrice('discounted', undefined, template, templateComponentPrice)
  const fontInfoDiscountedCurrency = getFontInfoOnPrice('discountedCurrency', undefined, template, templateComponentPrice)
  const fontInfoPrice = getFontInfoOnPrice('price', undefined, template, templateComponentPrice)
  const fontInfoPriceCurrency = getFontInfoOnPrice('priceCurrency', undefined, template, templateComponentPrice)
  const fontInfoUnitType = getFontInfoOnPrice('unitType', undefined, template, templateComponentPrice)
  const typePrice = price?.formatPrice ?? templateComponentPrice?.priceInfo?.formatPrice ?? template?.productInfo?.formatPrice

  const scale = useMemo(() => {
    const priceTagZoomFlyoutDefault = typePrice && mapFormatTypeScale[typePrice] ? mapFormatTypeScale[typePrice] : mapFormatTypeScale.default // scale
    const priceTagZoomFlyoutFromJson =
      product?.price?.priceTagZoomFlyout ?? templateComponentPrice?.priceInfo?.priceTagZoomFlyout ?? template?.priceInfo?.priceTagZoomFlyout

    return priceTagZoomFlyoutFromJson ? priceTagZoomFlyoutFromJson : priceTagZoomFlyoutDefault
  }, [typePrice, templateComponentPrice, product, template])

  const pbHeight = useComputePbDynamicHeight(pbInitialHeight)

  const computed = useMemo(() => {
    const priceTagZoomFlyout = `scale(${scale})`

    return {
      wrapperStyle: {
        width: pbWidth,
        height: pbHeight,
      },
      pbProps: {
        type: typePrice as string,
        data: {
          textCustom1: product?.price?.textCustom1,
          textCustom2: product?.price?.textCustom2,
          badge: (
            <>
              {activeSectionIndex != null && activeProductIndex != null && (
                <Badge sectionIndex={activeSectionIndex} productIndex={activeProductIndex} isInFlyout />
              )}
            </>
          ),
          discount: product?.price?.discount,
          fontData: {
            priceBlock: fontInfoPiceBlock,
            discount: fontInfoDiscount,
            discounted: fontInfoDiscounted,
            discountedCurrency: fontInfoDiscountedCurrency,
            price: fontInfoPrice,
            priceCurrency: fontInfoPriceCurrency,
            unitType: fontInfoUnitType,
          },
          highlightedDiscount: !!product?.highlightedDiscount,
          modifier: product?.modifier,
          priceDiscounted: {
            hasDecimal: discounted?.hasDecimals,
            separator: separators?.discounted,
            value: discounted?.value,
          },
          unitType: product?.unitType,
          priceOriginal: {
            hasDecimal: full?.hasDecimals,
            separator: separators?.full,
            value: full?.value,
          },
          style: {
            priceBlock: {
              backgroundColor:
                product?.price?.priceTagBackgroundColor ??
                templateComponentPrice?.cssVars?.priceTagBackgroundColor ??
                template?.cssVars?.priceTagBackgroundColor,
              width: product?.price?.priceTagWidth ?? templateComponentPrice?.priceInfo?.priceTagWidth ?? template?.priceInfo?.priceTagWidth,
              height: product?.price?.priceTagHeight ?? templateComponentPrice?.priceInfo?.priceTagHeight ?? template?.priceInfo?.priceTagHeight,
              centerPriceVertically: templateComponentPrice?.priceInfo?.centerPriceVertically ?? template?.priceInfo?.centerPriceVertically,
              transformCss: priceTagZoomFlyout,
              transformOrigin: priceBlockTransformOrigin,
              color: product?.price?.priceTagTextColor ?? templateComponentPrice?.cssVars?.priceTagTextColor ?? template?.cssVars?.priceTagTextColor,
              borderColor:
                product?.price?.priceTagBorderColor ?? templateComponentPrice?.cssVars?.priceTagBorderColor ?? template?.cssVars?.priceTagBorderColor,
            },
            price: {
              backgroundColor:
                product?.price?.priceTagTopBackgroundColor ??
                templateComponentPrice?.cssVars?.priceTagTopBackgroundColor ??
                template?.cssVars?.priceTagTopBackgroundColor,
              color:
                product?.price?.priceTagTopTextColor ?? templateComponentPrice?.cssVars?.priceTagTopTextColor ?? template?.cssVars?.priceTagTopTextColor,
              strokeColor:
                product?.price?.priceTagTopBorderColor ??
                templateComponentPrice?.cssVars?.priceTagTopBorderColor ??
                template?.cssVars?.priceTagTopBorderColor,
              hasLineThrough: full.hasLineThrough,
            },
            discount: {
              backgroundColor:
                product?.price?.discountPriceBackgroundColor ??
                templateComponentPrice?.cssVars?.discountPriceBackgroundColor ??
                template?.cssVars?.discountPriceBackgroundColor,
              color:
                product?.price?.discountPriceTextColor ??
                templateComponentPrice?.cssVars?.discountPriceTextColor ??
                template?.cssVars?.discountPriceTextColor,
            },
            discounted: {
              color:
                product?.price?.discountedPriceColor ?? templateComponentPrice?.cssVars?.discountedPriceColor ?? template?.cssVars?.discountedPriceColor,
              shadowColor:
                product?.price?.discountedPriceShadowColor ??
                templateComponentPrice?.cssVars?.discountedPriceShadowColor ??
                template?.cssVars?.discountedPriceShadowColor,
              strokeColor:
                product?.price?.discountedPriceStrokeColor ??
                templateComponentPrice?.cssVars?.discountedPriceStrokeColor ??
                template?.cssVars?.discountedPriceStrokeColor,
              strokeWidth:
                product?.price?.discountedPriceStrokeWidth ??
                templateComponentPrice?.cssVars?.discountedPriceStrokeWidth ??
                template?.cssVars?.discountedPriceStrokeWidth,
              trasformCss: templateComponentPrice?.priceInfo?.priceTrasform ?? template?.priceInfo?.priceTrasform,
            },
            unitType: {
              color: product?.price?.unitTypeTextColor ?? templateComponentPrice?.cssVars?.unitTypeTextColor ?? template?.cssVars?.unitTypeTextColor,
              backgroundColor:
                product?.price?.unitTypeBackgroundColor ??
                templateComponentPrice?.cssVars?.unitTypeBackgroundColor ??
                template?.cssVars?.unitTypeBackgroundColor,
            },
            priceCurrency: {
              color:
                product?.price?.priceCurrencyTextColor ??
                templateComponentPrice?.cssVars?.priceCurrencyTextColor ??
                template?.cssVars?.priceCurrencyTextColor,
              backgroundColor:
                product?.price?.priceCurrencyBackgroundColor ??
                templateComponentPrice?.cssVars?.priceCurrencyBackgroundColor ??
                template?.cssVars?.priceCurrencyBackgroundColor,
            },
            discountedCurrency: {
              color:
                product?.price?.discountedCurrencyTextColor ??
                templateComponentPrice?.cssVars?.discountedCurrencyTextColor ??
                template?.cssVars?.discountedCurrencyTextColor,
              backgroundColor:
                product?.price?.discountedCurrencyBackgroundColor ??
                templateComponentPrice?.cssVars?.discountedCurrencyBackgroundColor ??
                template?.cssVars?.discountedCurrencyBackgroundColor,
            },
          },
        }
      }
    }
  }, [
    activeProductIndex, activeSectionIndex, discounted, fontInfoDiscount, fontInfoDiscounted, fontInfoDiscountedCurrency, fontInfoPiceBlock, fontInfoPrice, fontInfoPriceCurrency, fontInfoUnitType, full, priceBlockTransformOrigin, product, template, templateComponentPrice, separators, pbHeight, scale, typePrice,
  ])


  return (
    <div ref={ref} className={className} style={computed.wrapperStyle}>
      <PriceBlock {...computed.pbProps} />
    </div>
  )
}

export { PriceTag }
