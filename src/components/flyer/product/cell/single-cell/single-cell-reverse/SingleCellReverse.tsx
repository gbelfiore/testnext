import React, { memo } from 'react'

import { ProductImage } from '~/components/flyer/product/product-image/ProductImage'
import { IconPlus } from '~/components/flyer/product/icon-plus/IconPlus'
import ProductInfo from '../../../product-info/ProductInfo'
import styles from './SingleCellReverse.module.css'
import classNames from 'classnames'
import { useProductWithChildrens } from '~/hooks/use-product'
import { ISingleCellProps } from '../typings'
import { PriceTag } from '../../../price-tag'
import ProductUtils from '~/utilities/product/ProductUtils'

const SingleCellReverseComponent = ({ sectionIndex, productIndex, ignoreModifier, showIconPlus }: ISingleCellProps) => {
  const { product } = useProductWithChildrens(sectionIndex, productIndex)

  const isProductWithChildren = ProductUtils.checkVariantsProduct(product)

  if (!product) return null

  return (
    <div className={styles.singleCellReverse}>
      <div className={styles.info}>
        <div className={styles.description}>
          <ProductInfo productIndex={productIndex} sectionIndex={sectionIndex} ignoreModifier={ignoreModifier} />
        </div>

        <div className={styles.price}>
          <PriceTag sectionIndex={sectionIndex} productIndex={productIndex} />
        </div>
      </div>
      <div className={classNames(styles.image, { [styles.imageWithVariant as string]: isProductWithChildren })}>
        <ProductImage sectionIndex={sectionIndex} productIndex={productIndex}>
          {showIconPlus && <IconPlus sectionIndex={sectionIndex} />}
        </ProductImage>
      </div>
    </div>
  )
}

export const SingleCellReverse = memo(SingleCellReverseComponent)
