/* eslint-disable react/display-name */

import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { ITplCssVars, ITplFont, ITplFontInfoCssVars, ITplSchema } from '~/typings/template'
import { VirtualizationConfig } from '~/utilities/product/VirtualizationUtility'
import { Text as TextComponent } from '~/components/flyer/section/section-name/heading/text/Text'
import { IProductOpt } from '~/typings/schemaopt'
import { isDesktop } from 'react-device-detect'
import useTemplate from '~/hooks/use-template'
import { PriceTag } from '../price-tag'
import styles from './Bundle.module.css'
import BundleProduct from './BundleProduct'
import IconPlus from './IconPlus'
import OtherInfo from '../../flyout/content-bundle/OtherInfo'
import { ICON_PLUS_COLOR } from './definitions'
import { ProductBundleUtils } from '~/utilities/product/ProductBundleUtils'

interface BundledProps {
  productIndex: number
  sectionIndex: number
  numberColumns?: number
  showAnimationPlus?: boolean
  showProductPrices?: boolean
  isMiniSection?: boolean
  showOtherInfo?: boolean
  product: IProductOpt
}

const Bundled = ({
  productIndex,
  sectionIndex,
  product: productParent,
  showProductPrices = false,
  showOtherInfo = false,
}: BundledProps) => {
  // const section = useSection(sectionIndex)
  const template = useTemplate()
  // const schema = useSchemaStore.getState().schema
  const cssVars = template?.cssVars as ITplCssVars
  const fontFamilies = template?.fonts?.families as ITplFont[]
  const fontInfoCssVars = template?.fontInfoCssVars as ITplFontInfoCssVars
  const columnsCount = ProductBundleUtils.getBundleColumnCount(productParent)

  const isVerticalList = useMemo(() => {
    if (!isDesktop || columnsCount === 1) {
      return true
    }
    return false
  }, [columnsCount])

  const isVerticalProduct = useMemo(() => {
    return isDesktop && columnsCount !== 1
  }, [columnsCount])
  const bundleProductsLength = useMemo(() => {
    return (productParent?.bundleProducts || []).length
  }, [productParent])

  const bundleContainerStyle = useMemo(() => {
    return {
      backgroundColor: productParent?.bundleInfo?.bundleHeaderBackgroundColor || cssVars?.bundleHeaderBackgroundColor || 'black',
      height: ProductBundleUtils.getBundleHeaderHeight(productParent),
    } as React.CSSProperties
  }, [cssVars?.bundleHeaderBackgroundColor, productParent])

  const priceBlock = useCallback(
    (isRow = true, height?: number) => {

      const bundleSubTextColor = productParent?.bundleInfo?.bundleSubTextColor || cssVars?.bundleSubTextColor || 'white'
      return (
        <div
          style={
            isRow
              ? {
                height,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
              }
              : {
                height,
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                textAlign: 'right',
                alignItems: 'flex-end',
                backgroundColor: productParent?.bundleInfo?.bundleBackgroundColor || template?.cssVars?.bundleBackgroundColor || cssVars?.bodyBackgroundColor
              }
          }
        >
          {isRow ? (
            <>
              <div
                className={styles.bundleSubText}
                style={
                  {
                    display: 'flex',
                    overflow: 'hidden',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    textAlign: 'left',
                    flex: 1,
                    '--bundle-var4': bundleSubTextColor,
                  } as React.CSSProperties
                }
              >
                {showOtherInfo && <OtherInfo limitLines={7} description={productParent?.bundleInfo?.otherInfo || ''} padding={0} />}
              </div>
              <div
                style={{
                  width: 120,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
                <PriceTag sectionIndex={sectionIndex} productIndex={productIndex} priceTransformOrigin={'bottom right'} />
              </div>
            </>
          ) : (
            <>
              <PriceTag sectionIndex={sectionIndex} productIndex={productIndex} priceTransformOrigin={'bottom right'} />
              <div
                className={styles.bundleSubText}
                style={
                  {
                    overflow: 'hidden',
                    '--bundle-var4': bundleSubTextColor,
                    marginTop: 10,
                  } as React.CSSProperties
                }
              >
                {showOtherInfo && <OtherInfo limitLines={10} description={productParent?.bundleInfo?.otherInfo || ''} padding={0} />}
              </div>
            </>
          )}
        </div>
      )
    },
    [cssVars?.bodyBackgroundColor, cssVars?.bundleSubTextColor, productIndex, productParent?.bundleInfo?.bundleBackgroundColor, productParent?.bundleInfo?.bundleSubTextColor, productParent?.bundleInfo?.otherInfo, sectionIndex, showOtherInfo, template?.cssVars?.bundleBackgroundColor]
  )

  const productRows = useMemo(() => {
    const totalProducts = (productParent?.bundleProducts || []).length
    const rows = Math.ceil(totalProducts / columnsCount)
    return {
      rows,
      isOneRow: rows === 1,
      isExactProductRows: totalProducts % columnsCount === 0,
    }
  }, [columnsCount, productParent?.bundleProducts])
  return (
    <>
      <div className={classNames(styles.bundleTitleContainer)} style={bundleContainerStyle}>
        <TextComponent sectionIndex={sectionIndex} color={productParent?.bundleInfo?.bundleHeaderTextColor || cssVars?.bundleHeaderTextColor || 'white'} isSticky={false}>
          {productParent?.name}
        </TextComponent>
      </div>
      <div
        className={styles.bundleProductContent}
        style={{
          flexDirection: 'column',
          backgroundColor: productParent?.bundleInfo?.bundleBackgroundColor || template?.cssVars?.bundleBackgroundColor || cssVars?.bodyBackgroundColor,
          padding: VirtualizationConfig.bundledHeights.gap
        }}
      >
        <div
          className={classNames(styles.bundleProductList)}
          style={{
            width: '100%',
            borderRadius: 4,
            overflow: 'hidden',
            gridGap: 1,
            backgroundColor: productParent?.bundleInfo?.bundleProductBorderColor || cssVars?.bundleProductBorderColor || 'white',
            ...(isVerticalList
              ? {
                flexDirection: 'column',
              }
              : {
                display: 'grid',
                gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
              }),
          }}
        >
          {productParent?.bundleProducts?.map((product, index) => {
            return (
              <BundleProduct
                productParent={productParent}
                isVerticalList={isVerticalList}
                isVertical={isVerticalProduct}
                template={template as ITplSchema}
                key={product.name}
                index={index}
                fontFamilies={fontFamilies}
                productIndex={productIndex}
                sectionIndex={sectionIndex}
                fontInfoCssVars={fontInfoCssVars}
                cssVars={cssVars as ITplCssVars}
                product={product}
                showIconPlus={(isVerticalList || productRows.isOneRow) && index != bundleProductsLength - 1}
              />
            )
          })}
          {!isVerticalList && !productRows.isExactProductRows ? priceBlock(false) : null}
          {!isVerticalList && !productRows.isOneRow ? <IconPlus size={90} color={productParent?.bundleInfo?.bundleIconPlusColor || cssVars?.bundleIconPlusColor || ICON_PLUS_COLOR} /> : null}
        </div>
        {isVerticalList
          ? priceBlock(isVerticalList, ProductBundleUtils.getBundleHeightPriceBlock(true))
          : productRows.isExactProductRows
            ? priceBlock(true, ProductBundleUtils.getBundleHeightPriceBlock(false))
            : null}
      </div>
    </>
  )
}

export default Bundled
