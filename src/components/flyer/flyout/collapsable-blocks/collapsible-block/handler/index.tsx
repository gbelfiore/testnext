import React, { CSSProperties, memo } from 'react'
import { useCallback } from 'react'
import { HandlerProps } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/handler/typings'
import { ChevronRight } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/handler/chevron-right'
import { Button } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/handler/button'
import useSection from '~/hooks/use-section'
import useTemplate from '~/hooks/use-template'
import { useFlyoutStore } from '~/state/flyout'

const HandlerComponent: React.FC<HandlerProps> = ({ isOpen, setIsOpen, title }) => {
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen])

  const activeSectionIndex = useFlyoutStore((state) => state.activeSectionIndex)
  const section = useSection(activeSectionIndex)

  const template = useTemplate(section)

  const spanStyle: CSSProperties = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    paddingRight: 12,
    textAlign: 'left',
  }

  return (
    <Button template={template} onClick={toggle}>
      {title && <span style={spanStyle} dangerouslySetInnerHTML={{ __html: title }} />}
      <ChevronRight template={template} isOpen={isOpen} />
    </Button>
  )
}

export const Handler = memo(HandlerComponent)
