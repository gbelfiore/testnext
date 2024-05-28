import React, { memo } from 'react'
import styles from './CollapsibleBlocks.module.css'
import { CollapsibleBlock } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block'
import { useFlyoutProductWithChildrens } from '~/hooks/use-product'

const CollapsableBlocksComponent: React.FC = () => {
  const { product } = useFlyoutProductWithChildrens()
  const collapsibleSections = product?.collapsibleSections
  if (!collapsibleSections || collapsibleSections.length === 0) return null

  return (
    <div className={styles.collapsibleBlocks}>
      {collapsibleSections.map((collapsibleSection) => (
        <CollapsibleBlock key={collapsibleSection.title} {...collapsibleSection} />
      ))}
    </div>
  )
}

export const CollapsableBlocks = memo(CollapsableBlocksComponent)
