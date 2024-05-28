import React, { memo } from 'react'

import { type TypesProps } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/typings'
import { Buy } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/buy'
import { Html } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/html'
import { Image } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/image'
import { Video } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/video'
import { Location } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/location'
import { Openings } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/openings'
import { Phone } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/phone'
import { SfProduct } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/sf-product'
import { SfProductDetails } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/sf-product-details'
import { type ICollapsibleSectionContentDataOpt } from '~/typings/schemaopt'

const TypesComponent: React.FC<TypesProps> = ({ contents }) => {
  if (!contents) return null

  return (
    <>
      {contents.map(({ type, props }, i) => {
        switch (type) {
          case 'sfProduct':
            const sfProductProps: ICollapsibleSectionContentDataOpt['sfProduct'] = props
            return <SfProduct key={String(i)} {...sfProductProps} />
          case 'sfProductDetails':
            const sfProductDetailsProps: ICollapsibleSectionContentDataOpt['sfProductDetails'] = props
            return <SfProductDetails key={String(i)} {...sfProductDetailsProps} />
          case 'html':
            const htmlProps: ICollapsibleSectionContentDataOpt['html'] = props
            return <Html key={String(i)} {...htmlProps} />
          case 'img':
            const imgProps: ICollapsibleSectionContentDataOpt['img'] = props
            return <Image key={String(i)} {...imgProps} />
          case 'video':
            const videoProps: ICollapsibleSectionContentDataOpt['video'] = props
            return <Video key={String(i)} {...videoProps} />
          case 'buy':
            return <Buy key={String(i)} />
          case 'location':
            return <Location key={String(i)} />
          case 'openings':
            return <Openings key={String(i)} />
          case 'phone':
            return <Phone key={String(i)} />
          default:
            return null
        }
      })}
    </>
  )
}

export const Types = memo(TypesComponent)
