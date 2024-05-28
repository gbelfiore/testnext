/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo } from 'react'
// import { PriceBlock } from '@doveconviene/next-format-ui-lib'
import { type PriceTagProps } from '~/components/flyer/product/price-tag/typings'

const PriceTagComponent = ({ sectionIndex, productIndex, productBundleIndex, priceTransformOrigin }: PriceTagProps) => {
  return <div>{'ciao'}</div>
  // <PriceBlock type={typePrice as string} data={dataComp} />
}

export const PriceTag = memo(PriceTagComponent)
