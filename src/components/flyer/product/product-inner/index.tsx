import { CSSProperties, useMemo } from 'react'
import { type ProductInnerProps } from '~/components/flyer/product/product-inner/typings'
import { useProductWithChildrens } from '~/hooks/use-product'
import ProductUtils from '~/utilities/product/ProductUtils'
import styles from './ProductInner.module.css'

const ProductInner = ({ sectionIndex, productIndex, ignoreModifier, children }: ProductInnerProps) => {
  const { product } = useProductWithChildrens(sectionIndex, productIndex)
  const isWide = useMemo(() => product?.modifier === 'wide', [product])
  const hasPaired = useMemo(() => (ignoreModifier ? false : ProductUtils.checkExistsPairedProduct(product)), [ignoreModifier, product])

  const getStyle = useMemo((): CSSProperties => {
    return { flexDirection: hasPaired || !isWide ? 'column' : 'row' }
  }, [hasPaired, isWide])

  return (
    <div className={styles.productInner} style={getStyle}>
      {children}
    </div>
  )
}

export { ProductInner }
