import React from 'react'
import { ColumnsInfo } from './columns-info'
import { RowsInfo } from './rows-info'
import { InfoProps } from './typings'
import { useProductWithChildrens } from '~/hooks/use-product'
import { eProductCellSubModifier } from '~/typings/eModifier'

const lookupInfo: Record<eProductCellSubModifier, React.FC> = {
  [eProductCellSubModifier.DEFAULT]: ColumnsInfo,
  [eProductCellSubModifier.REVERSE]: ColumnsInfo,
  [eProductCellSubModifier.IMG_SQUARED_PB_VERTICAL]: ColumnsInfo,
  [eProductCellSubModifier.IMG_SQUARED_PB_HORIZONTAL]: RowsInfo,
  [eProductCellSubModifier.IMG_SQUARED_PB_VERTICAL_OVER]: ColumnsInfo,
  [eProductCellSubModifier.IMG_SQUARED_PB_HORIZONTAL_OVER]: RowsInfo,
  [eProductCellSubModifier.IMG_RECTANGULAR_PB_VERTICAL]: ColumnsInfo,
  [eProductCellSubModifier.IMG_RECTANGULAR_PB_HORIZONTAL]: RowsInfo,
  [eProductCellSubModifier.IMG_RECTANGULAR_PB_VERTICAL_OVER]: ColumnsInfo,
  [eProductCellSubModifier.IMG_RECTANGULAR_PB_HORIZONTAL_OVER]: RowsInfo,
}

export const Info: React.FC<InfoProps> = ({ sectionIndex, productIndex }) => {
  const { product } = useProductWithChildrens(sectionIndex, productIndex)

  const Component = lookupInfo[product.subModifier] || lookupInfo.default

  return <Component />
}
