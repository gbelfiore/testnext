import React, { memo, useState } from 'react'
import { ICollapsibleSectionOpt } from '~/typings/schemaopt'
import { Contents } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/Contents'
import { Handler } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/handler'

const CollapsibleBlockComponent: React.FC<ICollapsibleSectionOpt> = ({ title, contents, isDefaultOpen }) => {
  const [isOpen, setIsOpen] = useState(Boolean(isDefaultOpen))
  return (
    <div>
      <Handler isOpen={isOpen} setIsOpen={setIsOpen} title={title} />
      {contents && <Contents isOpen={isOpen} contents={contents} title={title} />}
    </div>
  )
}

export const CollapsibleBlock = memo(CollapsibleBlockComponent)
