import React, { memo } from 'react'

import { ProductImage } from '~/components/flyer/product/product-image/ProductImage'
import { IconPlus } from '~/components/flyer/product/icon-plus/IconPlus'
import ProductInfo from '../../../product-info/ProductInfo'
import styles from './WideCellDefault.module.css'
import classNames from 'classnames'
import { useProductWithChildrens } from '~/hooks/use-product'
import { PriceTag } from '../../../price-tag'
import { IWideCellProps } from '../typings'
import ProductUtils from '~/utilities/product/ProductUtils'

const WideCellDefaultComponent = ({ sectionIndex, productIndex, ignoreModifier, showIconPlus }: IWideCellProps) => {
  const { product } = useProductWithChildrens(sectionIndex, productIndex)

  const isProductWithChildren = ProductUtils.checkVariantsProduct(product)

  if (!product) return null

  return (
    <div className={styles.wideCellDefault}>
      {/*  {isProductWithChildren && <ProductRoot optionsCount={product.children?.length} />} */}
      <div className={classNames(styles.content, { [styles.contentWithVariant as string]: isProductWithChildren })}>
        <div className={styles.image}>
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
    </div>
  )
}

export const WideCellDefault = memo(WideCellDefaultComponent)
