import { Brand } from '~/components/brand'
import { ProductName } from '../product-name/ProductName'
import { useMemo } from 'react'
import styles from './ProductInfo.module.css'
import { useProductWithChildrens } from '~/hooks/use-product'
import { ProductDescription } from '../product-description/ProductDescription'
import classNames from 'classnames'

interface IProductInfoProps {
  sectionIndex: number
  productIndex: number
  ignoreModifier?: boolean
  titleClassName?: string
  descriptionClassName?: string
}

const ProductInfo = ({
  sectionIndex,
  productIndex,
  ignoreModifier,
  descriptionClassName,
  titleClassName,
}: IProductInfoProps) => {
  const { product } = useProductWithChildrens(sectionIndex, productIndex)

  const brandImageMargin = useMemo(() => product?.brandImageMargin, [product])
  const hideBottomLine = useMemo(() => product?.hideBottomLine, [product])
  if (hideBottomLine) return null
  const styleBrand = brandImageMargin ? { margin: brandImageMargin } : { margin: '0 0 10px 0' }

  return (
    <div className={styles.productInfo}>
      <Brand
        sectionIndex={sectionIndex}
        productIndex={productIndex}
        styleBrandImage={styleBrand}
        isMergeStyleImage={true}
      />
      {product?.name && (
        <ProductName
          className={classNames('w-full', titleClassName)}
          sectionIndex={sectionIndex}
          productIndex={productIndex}
          ignoreModifier={ignoreModifier}
        />
      )}

      {product.description && (
        <ProductDescription
          className={classNames('line-clamp-4 w-full', descriptionClassName)}
          sectionIndex={sectionIndex}
          productIndex={productIndex}
          ignoreModifier={ignoreModifier}
        />
      )}
    </div>
  )
}

export default ProductInfo
