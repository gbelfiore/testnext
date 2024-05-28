import React, { memo } from 'react'
import { RefsManager } from '~/utilities/refs-manager'
import { InnerProps } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/inner/typings'
import { Types } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types'

const InnerComponent: React.FC<InnerProps> = ({ title, contents }) => {
  const ref = RefsManager.useReferencesManager({
    refKey: title,
    removeOnUnmount: false,
    type: 'inner',
  })

  return (
    <div ref={ref}>
      <Types contents={contents} />
    </div>
  )
}

export const Inner = memo(InnerComponent)
