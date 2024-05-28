import React, { memo, useMemo } from 'react'
import { ICollapsibleSectionContentDataOpt } from '~/typings/schemaopt'
import { Html } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/html'

const SfProductComponent: React.FC<ICollapsibleSectionContentDataOpt['sfProduct']> = (props) => {
  const description = useMemo(() => props?.data?.description, [props])

  if (!description) return null

  return <Html data={description} />
}

export const SfProduct = memo(SfProductComponent)
