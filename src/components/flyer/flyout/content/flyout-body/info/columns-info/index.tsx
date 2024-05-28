import React from 'react'

import { TextBox } from '../text-box'
import { FlyoutPrice } from '~/components/flyer/flyout/price'
import { ProductName } from '~/components/flyer/flyout/content/flyout-body/product-name'
import { ProductSubName } from '~/components/flyer/flyout/content/flyout-body/product-subname'


export const ColumnsInfo = () => {
  return (
    <div className='flex'>
      <div className='flex flex-col flex-1 gap-[4px]'>
        <TextBox>
          <ProductName />
          <ProductSubName />
        </TextBox>
      </div>
      <FlyoutPrice className='flex justify-end' priceBlockTransformOrigin='100% 0' />
    </div>
  )
}
