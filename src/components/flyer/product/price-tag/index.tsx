import React, { memo, useMemo } from 'react'
import { PriceBlock } from '@doveconviene/next-format-ui-lib'
import { type PriceTagProps } from '~/components/flyer/product/price-tag/typings'
import { getFontInfoOnPrice } from '~/hooks/use-font-info'
import { getTemplate } from '~/hooks/use-template'
import { getTemplateComponent } from '~/hooks/use-template-component'
import { Badge } from '../../../badge/Badge'
import { usePrice } from '~/hooks/use-price'
import { useSchemaStore } from '~/state/schema'
import useSection from '~/hooks/use-section'
import { useProductWithChildrens } from '~/hooks/use-product'

const PriceTagComponent = ({ sectionIndex, productIndex, productBundleIndex, priceTransformOrigin }: PriceTagProps) => {
  const schema = useSchemaStore.getState().schema
  const section = useSection(sectionIndex)
  const { product } = useProductWithChildrens(sectionIndex, productIndex, productBundleIndex)
  const template = getTemplate(schema, section)
  const templateComponentPrice = getTemplateComponent(schema, 'price', template, section, product)

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
  const fontInfoDiscountedCurrency = getFontInfoOnPrice(
    'discountedCurrency',
    undefined,
    template,
    templateComponentPrice
  )
  const fontInfoPrice = getFontInfoOnPrice('price', undefined, template, templateComponentPrice)
  const fontInfoPriceCurrency = getFontInfoOnPrice('priceCurrency', undefined, template, templateComponentPrice)
  const fontInfoUnitType = getFontInfoOnPrice('unitType', undefined, template, templateComponentPrice)

  const typePrice = useMemo(
    () =>
      product?.price?.formatPrice ??
      templateComponentPrice?.priceInfo?.formatPrice ??
      template?.productInfo?.formatPrice,
    [product, template, templateComponentPrice]
  )

  const priceTagZoomDefault = 'scale(1)'
  const priceTagZoomFromJson =
    product?.price?.priceTagZoom ?? templateComponentPrice?.priceInfo?.priceTagZoom ?? template?.priceInfo?.priceTagZoom
  const priceTagZoom = priceTagZoomFromJson ? `scale(${priceTagZoomFromJson})` : priceTagZoomDefault

  const dataComp = {
    textCustom1: product?.price?.textCustom1,
    textCustom2: product?.price?.textCustom2,
    badge: (
      <>
        <Badge sectionIndex={sectionIndex} productIndex={productIndex} productBundleIndex={productBundleIndex} />
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
        transformOrigin: priceTransformOrigin,
        backgroundColor:
          product?.price?.priceTagBackgroundColor ??
          templateComponentPrice?.cssVars?.priceTagBackgroundColor ??
          template?.cssVars?.priceTagBackgroundColor,
        width:
          product?.price?.priceTagWidth ??
          templateComponentPrice?.priceInfo?.priceTagWidth ??
          template?.priceInfo?.priceTagWidth,
        height:
          product?.price?.priceTagHeight ??
          templateComponentPrice?.priceInfo?.priceTagHeight ??
          template?.priceInfo?.priceTagHeight,
        centerPriceVertically:
          templateComponentPrice?.priceInfo?.centerPriceVertically ?? template?.priceInfo?.centerPriceVertically,
        transformCss: priceTagZoom,
        color:
          product?.price?.priceTagTextColor ??
          templateComponentPrice?.cssVars?.priceTagTextColor ??
          template?.cssVars?.priceTagTextColor,
        borderColor:
          product?.price?.priceTagBorderColor ??
          templateComponentPrice?.cssVars?.priceTagBorderColor ??
          template?.cssVars?.priceTagBorderColor,
      },
      price: {
        backgroundColor:
          product?.price?.priceTagTopBackgroundColor ??
          templateComponentPrice?.cssVars?.priceTagTopBackgroundColor ??
          template?.cssVars?.priceTagTopBackgroundColor,
        color:
          product?.price?.priceTagTopTextColor ??
          templateComponentPrice?.cssVars?.priceTagTopTextColor ??
          template?.cssVars?.priceTagTopTextColor,
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
          product?.price?.discountedPriceColor ??
          templateComponentPrice?.cssVars?.discountedPriceColor ??
          template?.cssVars?.discountedPriceColor,
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
        color:
          product?.price?.unitTypeTextColor ??
          templateComponentPrice?.cssVars?.unitTypeTextColor ??
          template?.cssVars?.unitTypeTextColor,
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

  return <PriceBlock type={typePrice as string} data={dataComp} />
}

export const PriceTag = memo(PriceTagComponent)
