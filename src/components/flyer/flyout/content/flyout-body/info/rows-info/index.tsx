import React from 'react'

import { TextBox } from '../text-box'
import { FlyoutPrice } from '~/components/flyer/flyout/price'
import { ProductName } from '~/components/flyer/flyout/content/flyout-body/product-name'
import { ProductSubName } from '~/components/flyer/flyout/content/flyout-body/product-subname'


export const RowsInfo = () => {
  return (
    <div className='flex flex-col gap-[12px]'>
      <FlyoutPrice priceBlockTransformOrigin='0 0' />
      <TextBox>
        <ProductName />
        <ProductSubName />
      </TextBox>
    </div>
  )
}
