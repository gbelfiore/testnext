import { ProductInner } from '../product-inner'
import { ProductOuter } from '../product-outer'
import { type ProductProps } from '../typings'
import { memo, useCallback, useMemo } from 'react'
import MediaProduct from '../media/MediaImages'
import { useProductWithChildrens } from '~/hooks/use-product'
import { eProductModifier } from '~/typings/eModifier'
import SingleCell from '../cell/single-cell/SingleCell'
import WideCell from '../cell/wide-cell/WideCell'
import BundledProduct from '../bundled'
import ProductUtils from '~/utilities/product/ProductUtils'
import { SingleCellReverse } from '../cell/single-cell/single-cell-reverse/SingleCellReverse'

interface IChooseRenderProduct extends ProductProps {
  showIconPlus: boolean
}

const ChooseRenderProduct = ({ productIndex, sectionIndex, ignoreModifier, showIconPlus }: IChooseRenderProduct) => {
  const { product } = useProductWithChildrens(sectionIndex, productIndex)

  // --- MEDIA RENDER ---
  const getMedia = useMemo(() => {
    if (!product || sectionIndex === undefined || productIndex === undefined) {
      return null
    }

    return (
      <MediaProduct
        media={product}
        key={`media_${sectionIndex}_${productIndex}`}
        sectionIndex={sectionIndex}
        productIndex={productIndex}
      />
    )
  }, [product, productIndex, sectionIndex])

  // --- WIDE RENDER ---
  const getWideCell = useCallback(
    (forceDefault?: boolean) => {
      if (!product) return null
      return (
        <WideCell
          sectionIndex={sectionIndex}
          productIndex={productIndex}
          ignoreModifier={ignoreModifier}
          showIconPlus={showIconPlus}
          forceDefault={forceDefault}
        />
      )
    },
    [ignoreModifier, product, productIndex, sectionIndex, showIconPlus]
  )

  // --- CELL RENDER ---
  const getSingleCell = useCallback(
    (forceDefault?: boolean) => {
      if (!product) return null
      return (
        <SingleCell
          sectionIndex={sectionIndex}
          productIndex={productIndex}
          ignoreModifier={ignoreModifier}
          showIconPlus={showIconPlus}
          //forceDefault={forceDefault}
        />
      )
    },
    [ignoreModifier, product, productIndex, sectionIndex, showIconPlus]
  )

  const getBundleProduct = useMemo(() => {
    if (!product || sectionIndex === undefined || productIndex === undefined) {
      return null
    }

    return (
      <BundledProduct
        showOtherInfo
        product={product}
        isMiniSection
        sectionIndex={sectionIndex}
        showAnimationPlus={showIconPlus}
        productIndex={productIndex}
      />
    )
  }, [product, productIndex, sectionIndex, showIconPlus])

  // --- CHOOSE PRODUCT RENDER ---
  const getComponentProduct = useMemo(() => {
    if (!product) return null
    const isMedia = ProductUtils.checkMediaProduct(product)
    const isBundleProduct = ProductUtils.checkBundleProduct(product)
    const isCell = product?.modifier === eProductModifier.CELL
    const isWide = product?.modifier === eProductModifier.WIDE
    const isCellReverse = product?.modifier === 'cell-reverse'

    if (isMedia) return getMedia
    if (isBundleProduct) return getBundleProduct
    if (ignoreModifier) return getSingleCell(true)

    let componentProduct = getSingleCell(true)

    //TODO[GB]: maintains backwards compatibility. to be removed when there are no more old "catalogues"
    if (isCellReverse) {
      componentProduct = (
        <SingleCellReverse
          sectionIndex={sectionIndex}
          productIndex={productIndex}
          ignoreModifier={ignoreModifier}
          showIconPlus={showIconPlus}
        />
      )
    } else if (isCell) {
      componentProduct = getSingleCell()
    } else if (isWide) {
      componentProduct = getWideCell()
    }

    return componentProduct
  }, [
    product,
    getMedia,
    getBundleProduct,
    ignoreModifier,
    getSingleCell,
    sectionIndex,
    productIndex,
    showIconPlus,
    getWideCell,
  ])

  return (
    <ProductOuter>
      <ProductInner sectionIndex={sectionIndex} productIndex={productIndex} ignoreModifier={ignoreModifier}>
        {getComponentProduct}
      </ProductInner>
    </ProductOuter>
  )
}

export default memo(ChooseRenderProduct)
