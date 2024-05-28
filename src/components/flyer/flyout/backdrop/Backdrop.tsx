import React, { memo } from 'react'
import styles from './Backdrop.module.css'
import { useFlyoutStore } from '~/state/flyout'


const BackdropComponent = () => {
  const isFlyoutOpen = useFlyoutStore((state) => state.isFlyoutOpen)
  const closeFlyout = useFlyoutStore((state) => state.closeFlyout)

  const onWheel = () => {
    closeFlyout()
  }

  if (!isFlyoutOpen) return null

  return <div onTouchMove={onWheel} draggable onWheel={onWheel} onClick={closeFlyout} className={styles.backdrop} />
}

export const Backdrop = memo(BackdropComponent)
