import React from 'react'
import ProductUtils from '~/utilities/product/ProductUtils'
import { IProductOpt } from '~/typings/schemaopt'

type Props = {
  children: React.ReactNode
  product: IProductOpt
}

const CellWrapper = ({ product, children }: Props) => {
  const { height } = ProductUtils.getCellSizes(product)

  const cellStyle = {
    height: `${height}px`,
  }

  return <div style={cellStyle}>{children}</div>
}

export default CellWrapper
