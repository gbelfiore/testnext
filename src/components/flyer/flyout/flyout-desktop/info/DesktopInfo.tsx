

import React, { memo } from 'react'
import { Availability } from '~/components/flyer/flyout/availability/Availability'
import { DesktopDescription } from './description/DesktopDescription'
import { Highlights } from '~/components/flyer/flyout/highlights'
import { DesktopProductName } from './product-name'
import { Specs } from '~/components/flyer/flyout/specs'
import { DesktopProductSubName } from './product-subname'
import { DesktopBrand } from './brand'

interface InfoComponentProps {
  childrenPrice?: React.ReactNode
}

const DesktopInfoComponent = ({ childrenPrice }: InfoComponentProps) => {
  return (
    <>
      <div className='flex flex-col gap-[8px]'>
        <div className='flex'>
          <div className='flex flex-col flex-1 gap-[8px]'>
            <DesktopBrand />
            <DesktopProductName />
            <DesktopProductSubName />
          </div>
          <div className='justify-self-end'>
            {childrenPrice}
          </div>
        </div>
        <DesktopDescription />
        <Specs />
        <Availability />
        <Highlights />
      </div>
    </>
  )
}

export const DesktopInfo = memo(DesktopInfoComponent)
