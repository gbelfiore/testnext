import { useProductWithChildrens } from '~/hooks/use-product'
import { IWideCellProps } from './typings'
import { useMemo } from 'react'
import { eProductWideSubModifier } from '~/typings/eModifier'
import { WideCellDefault } from './wide-cell-default/WideCellDefault'
import ProductUtils from '~/utilities/product/ProductUtils'
import CellBottom from '../../cell/cell-bottom/CellBottom'

const WideCell = ({
  sectionIndex,
  productIndex,
  ignoreModifier,
  showIconPlus,
  forceDefault = false,
}: IWideCellProps & { forceDefault?: boolean }) => {
  const { parent, product } = useProductWithChildrens(sectionIndex, productIndex)

  const { height } = ProductUtils.getCellSizes(product)

  const getWideDefault = useMemo(() => {
    if (!product) return null

    return (
      <div
        style={{
          height,
        }}
        className="w-full"
      >
        <WideCellDefault
          key={`product_${sectionIndex}_${productIndex}`}
          sectionIndex={sectionIndex}
          productIndex={productIndex}
          ignoreModifier={ignoreModifier}
          showIconPlus={showIconPlus}
        />
        <CellBottom parent={parent} product={product} sectionIndex={sectionIndex} productIndex={productIndex} />
      </div>
    )
  }, [height, ignoreModifier, parent, product, productIndex, sectionIndex, showIconPlus])

  const getWide = useMemo(() => {
    if (!product) return null
    let componentProduct = getWideDefault
    if (!forceDefault) {
      if (product.subModifier == eProductWideSubModifier.DEFAULT) {
        componentProduct = getWideDefault
      }
    }
    return componentProduct
  }, [forceDefault, getWideDefault, product])

  return getWide
}

export default WideCell
