import React, { memo } from 'react'
import { Opening } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/openings/opening'
import { useSchemaStore } from '~/state/schema'
import { ICollapsibleSectionContentDataOpt } from '~/typings/schemaopt'

const OpeningsComponent: React.FC<ICollapsibleSectionContentDataOpt['openings']> = () => {
  const openings = useSchemaStore((state) => state.schema?.retailer?.openings)

  if (!openings) return null

  return (
    <div>
      {openings.map((props, index) => {
        let id = index + 1
        const isLast = index === openings.length - 1
        if (isLast) id = 0
        return <Opening key={id} {...props} id={id} isLast={isLast} />
      })}
    </div>
  )
}

export const Openings = memo(OpeningsComponent)
