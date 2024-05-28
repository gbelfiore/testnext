import React, { useCallback, useEffect, useState } from 'react'
import styles from './ProductStickyHeader.module.css'
import { useFlyoutStore } from '~/state/flyout'
import { StickyHeaderProductName } from './product-name'
import { StickyHeaderImage } from './image'
import { RefsManager } from '~/utilities/refs-manager'
import { RefKeys } from '~/utilities/refs-manager/enum'



export const ProductStickyHeader = () => {
  const [showHeader, setShowHeader] = useState(false)
  const flyoutState = useFlyoutStore.getState()

  const textBox = RefsManager.getRef<HTMLDivElement>(RefKeys.FLYOUT_TEXT_BOX)?.ref

  const onScroll = useCallback((event: Event) => {
    if (!event.target || !textBox) return
    const target = event.target as HTMLElement
    console.log({scrollTop: target.scrollTop, offsetTop: textBox.offsetTop, offsetHeight: textBox.offsetHeight, offsetParent: textBox.offsetParent})

    setShowHeader(target.scrollTop > (textBox.offsetTop + textBox.offsetHeight))
  }, [textBox])

  useEffect(() => {
    const scroller = document.querySelector('[data-rsbs-scroll="true"]')
    if (!scroller) return

    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

  if (!showHeader) return null

  return (
    <div className={styles.header}>
      <div className={styles.productImage}>
        <StickyHeaderImage 
          sectionIndex={flyoutState.activeSectionIndex ?? 0}
          productIndex={flyoutState.activeProductIndex ?? 0} />
      </div>

      <div className={styles.productBody}>
        <StickyHeaderProductName />
      </div>
    </div>
  )
}
