import React, { useMemo } from 'react'
import { IProduct } from '~/typings/schema'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import { getStaticPath, getStaticPathForWebP, useStaticPath } from '~/hooks/use-static-path'
import { ITplCssVars, ITplFont, ITplFontInfoCssVars, ITplSchema } from '~/typings/template'
import { VirtualizationConfig } from '~/utilities/product/VirtualizationUtility'
import { ProductName } from '../product-name/ProductName'
import { ProductSubName } from '../product-sub-name/ProductSubName'
import { BrandImage } from '../brand-image'
import styles from './BundleProduct.module.css'
import PriceBlockSimple from '../price-block-simple'
import IconPlus from './IconPlus'
import { ICON_PLUS_COLOR } from './definitions'
import { isDesktop } from 'react-device-detect'
import { ProductBundleUtils } from '~/utilities/product/ProductBundleUtils'
import { IProductOpt } from '~/typings/schemaopt'

interface BundleProductProps {
  productParent: IProductOpt
  product: IProduct
  template: ITplSchema
  index: number
  showIconPlus?: boolean
  cssVars: ITplCssVars
  fontInfoCssVars: ITplFontInfoCssVars
  sectionIndex: number
  productIndex: number
  isVertical: boolean
  isVerticalList: boolean
  fontFamilies?: ITplFont[]
}

const BundleProduct = ({
  productParent,
  product,
  showIconPlus,
  cssVars,
  sectionIndex,
  productIndex,
  index,
  template,
  isVertical,
  isVerticalList,
}: BundleProductProps) => {
  const productImage = getStaticPath(product.productImage)
  const productImageWebP = getStaticPathForWebP(productImage)

  const brandImage = useStaticPath(product?.brandImage)
  const brandImageWidth = useMemo(() => product?.brandImageWidth, [product])
  const brandImageHeight = useMemo(() => product?.brandImageHeight, [product])

  const fontSizePriceBlock = useMemo(() => {
    let fontSize = (template?.fontInfoCssVars?.productCellSingleNameFontSize ? parseInt(template?.fontInfoCssVars?.productCellSingleNameFontSize) : 18)
    if(isDesktop && template?.fontInfoCssVars?.productCellSingleNameFontSizeDesktop) {
      fontSize = parseInt(template?.fontInfoCssVars?.productCellSingleNameFontSizeDesktop)
    }
    return fontSize * 1.6},
    [template?.fontInfoCssVars?.productCellSingleNameFontSize, template?.fontInfoCssVars?.productCellSingleNameFontSizeDesktop]
  )

  return (
    <div
      className={styles.bundleProductWrapper}
      style={{
        flex: 1,
        flexDirection: isVertical ? 'column' : 'row',
        height: isVerticalList ? ProductBundleUtils.getHeightProductHorizontal(isDesktop) : VirtualizationConfig.bundledHeights.productVerticalDesk,
        maxHeight: isVerticalList ? ProductBundleUtils.getHeightProductHorizontal(isDesktop) : VirtualizationConfig.bundledHeights.productVerticalDesk,
        minHeight: isVerticalList ? ProductBundleUtils.getHeightProductHorizontal(isDesktop) : VirtualizationConfig.bundledHeights.productVerticalDesk,
        backgroundColor: productParent.bundleInfo?.bundleProductBackgroundColor || cssVars?.bundleProductBackgroundColor || 'rgb(181, 185, 193, 0.8)',
        color: productParent.bundleInfo?.bundleProductTextColor || cssVars?.bundleProductTextColor || 'black',
        padding: VirtualizationConfig.bundledHeights.gap,
        gap: VirtualizationConfig.bundledHeights.gap
      }}
    >
      <div
        className={styles.bundleProductImageContainer}
        style={{
          position: 'relative',
          ...(isVertical
            ? {
              height: 200,
              maxHeight: 200,
            }
            : {
              flexBasis: '50%',
              flex: 1,
            }),
        }}
      >
        {productImage && (
          <PictureWebP
            style={{
              objectFit: 'contain',
              width: '100%',
              height: '100%',
            }}
            src={productImage}
            webp={productImageWebP}
          />
        )}
        {showIconPlus && (
          <IconPlus style={{
            ...(!isVertical ? {
              position: 'absolute',
              bottom: -30,
              zIndex: 1,
              left: 0,
              right: 0,
              margin: 'auto',
            } : {
              position: 'absolute',
              right: -30,
              zIndex: 1,
              top: 0,
              bottom: 0,
              margin: 'auto',
            })
          }} size={46} color={productParent.bundleInfo?.bundleIconPlusColor || cssVars?.bundleIconPlusColor || ICON_PLUS_COLOR} />
        )}
      </div>
      <div
        style={{
          flexBasis: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: VirtualizationConfig.bundledHeights.gap,
            marginBottom: 10,
          }}
        >
          <div>{brandImage && <BrandImage src={brandImage} width={brandImageWidth} height={brandImageHeight || 16} alt={product?.brandText} />}</div>
          <div className={styles.bundleProductNameContainer} style={{
            '--bundle-product-var1': isVerticalList ? 2 : 3,
          } as React.CSSProperties}>
            <ProductName productIndex={productIndex} sectionIndex={sectionIndex} productBundleIndex={index} />
          </div>
          <div className={styles.bundleProductDescriptionContainer} style={{
            '--bundle-product-var2': isVerticalList ? 1 : 2,
          } as React.CSSProperties}>
            <ProductSubName sectionIndex={sectionIndex} productIndex={productIndex} productBundleIndex={index} />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            ...(isVertical
              ? {
                left: 0,
              }
              : {
                right: 0,
              }),
          }}
        >
          <PriceBlockSimple
            isPlain={false}
            price={product?.price}
            fontFamily={template?.fontInfoCssVars?.productCellSingleNameFontFamily || template?.fonts?.families?.[1].name}
            fontSize={fontSizePriceBlock}
          />
        </div>
      </div>
    </div>
  )
}

export default BundleProduct
