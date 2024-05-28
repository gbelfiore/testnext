import React, { memo } from 'react'

import { ProductImage } from '~/components/flyer/product/product-image/ProductImage'
import { type ISingleCellProps } from '~/components/flyer/product/cell/single-cell/typings'
import { IconPlus } from '~/components/flyer/product/icon-plus/IconPlus'
import styles from './SingleCellVRectangularOverlap.module.css'
import classNames from 'classnames'
import { useProductWithChildrens } from '~/hooks/use-product'
import { PriceTag } from '../../../price-tag'
import ProductUtils from '~/utilities/product/ProductUtils'
import ProductInfo from '../../../product-info/ProductInfo'

const SingleCellVRectangularOverlapComponent = ({
  sectionIndex,
  productIndex,
  ignoreModifier,
  showIconPlus,
}: ISingleCellProps) => {
  const { parent, product } = useProductWithChildrens(sectionIndex, productIndex)

  const isProductWithChildren = ProductUtils.checkVariantsProduct(parent)

  if (!product) return null

  return (
    <div className={styles.singleCellDefault}>
      <div className={classNames(styles.image, { [styles.imageWithVariant as string]: isProductWithChildren })}>
        <ProductImage sectionIndex={sectionIndex} productIndex={productIndex}>
          {showIconPlus && <IconPlus sectionIndex={sectionIndex} />}
        </ProductImage>
      </div>

      <div className={styles.info}>
        <div className={styles.description}>
          <ProductInfo productIndex={productIndex} sectionIndex={sectionIndex} ignoreModifier={ignoreModifier} />
        </div>

        <div className={styles.price}>
          <PriceTag sectionIndex={sectionIndex} productIndex={productIndex} />
        </div>
      </div>
    </div>
  )
}

export const SingleCellVRectangularOverlap = memo(SingleCellVRectangularOverlapComponent)
