import { useProductWithChildrens } from '~/hooks/use-product'
import { ISingleCellProps } from './typings'
import { SingleCellDefault } from './single-cell-default/SingleCellDefault'
import { SingleCellReverse } from './single-cell-reverse/SingleCellReverse'
import { eProductCellSubModifier } from '~/typings/eModifier'
import CellWrapper from '../CellWrapper'
import { SingleCellPbHorizontal } from './single-cell-pb-horizontal/SingleCellPbHorizontal'
import { SingleCellVRectangular } from './single-cell-v-rectangular/SingleCellVRectangular'
import { SingleCellHRectangular } from './single-cell-h-rectangular/SingleCellHRectangular'
import { SingleCellHSquaredOverlap } from './single-cell-h-squared-overlap/SingleCellHSquaredOverlap'
import { SingleCellVSquaredOverlap } from './single-cell-v-squared-overlap/SingleCellVSquaredOverlap'
import { SingleCellVRectangularOverlap } from './single-cell-v-rectangular-overlap/SingleCellVRectangularOverlap'
import CellBottom from '../cell-bottom/CellBottom'
import { useMemo } from 'react'
import ProductUtils from '~/utilities/product/ProductUtils'

/* Solve et Coagula */

type LookupSingleCell = {
  [key in eProductCellSubModifier]: any
}

const lookupSingleCell: LookupSingleCell = {
  [eProductCellSubModifier.DEFAULT]: SingleCellDefault,
  [eProductCellSubModifier.REVERSE]: SingleCellReverse,
  [eProductCellSubModifier.IMG_SQUARED_PB_VERTICAL]: SingleCellDefault,
  [eProductCellSubModifier.IMG_SQUARED_PB_HORIZONTAL]: SingleCellPbHorizontal,
  [eProductCellSubModifier.IMG_SQUARED_PB_HORIZONTAL_OVER]: SingleCellHSquaredOverlap,
  [eProductCellSubModifier.IMG_SQUARED_PB_VERTICAL_OVER]: SingleCellVSquaredOverlap,
  [eProductCellSubModifier.IMG_RECTANGULAR_PB_VERTICAL]: SingleCellVRectangular,
  [eProductCellSubModifier.IMG_RECTANGULAR_PB_HORIZONTAL]: SingleCellHRectangular,
  [eProductCellSubModifier.IMG_RECTANGULAR_PB_HORIZONTAL_OVER]: SingleCellHRectangular,
  [eProductCellSubModifier.IMG_RECTANGULAR_PB_VERTICAL_OVER]: SingleCellVRectangularOverlap,
}

const SingleCell = (props: ISingleCellProps) => {
  const { sectionIndex, productIndex } = props
  const { parent, product } = useProductWithChildrens(sectionIndex, productIndex)

  // const CellComponent =
  //   product.modifier === 'cell-reverse'
  //     ? lookupSingleCell['reverse']
  //     : product?.subModifier
  //       ? product.subModifier === 'default'
  //         ? lookupSingleCell['default']
  //         : lookupSingleCell[product.subModifier as eProductCellSubModifier]
  //       : lookupSingleCell['default']

  const getCellComponent = useMemo(() => {
    const { subModifier } = ProductUtils.getModifier(product.modifier, product.subModifier)
    return lookupSingleCell[subModifier]
  }, [product])

  const CellComponent = getCellComponent

  return (
    <CellWrapper product={product}>
      {CellComponent && <CellComponent {...props} />}
      <CellBottom parent={parent} product={product} productIndex={productIndex} sectionIndex={sectionIndex} />
    </CellWrapper>
  )
}

export default SingleCell
