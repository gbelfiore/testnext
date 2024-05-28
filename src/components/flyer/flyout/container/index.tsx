import React, { memo, useEffect } from 'react'
import { useFlyoutStore } from '~/state/flyout'

import { type ContainerProps } from '~/components/flyer/flyout/container/typings'

import { usePrevious } from '~/hooks/use-previous'
import { RefsManager } from '~/utilities/refs-manager'
import { RefKeys, RefTypes } from '~/utilities/refs-manager/enum'
import { useAppStore } from '~/state/app'

const ContainerComponent = ({ children }: ContainerProps) => {
  const isClient = useAppStore((state) => state.isClient)

  const flyoutScroller = RefsManager.useReferencesManager({
    refKey: RefKeys.FLYOUT_SCROLLER,
    type: RefTypes.DIV,
  })

  const isFlyoutOpen = useFlyoutStore((state) => state.isFlyoutOpen)
  const isFlyoutFullyOpen = useFlyoutStore((state) => state.isFlyoutFullyOpen)

  const isPrevFlyoutOpen = usePrevious(isFlyoutOpen)
  const isPrevFlyoutFullyOpen = usePrevious(isFlyoutFullyOpen)
  const containerClass = `fixed top-0 left-0 h-full w-full z-10 overflow-hidden ${isFlyoutOpen ? 'pointer-events-auto' : 'pointer-events-none'}`

  useEffect(() => {
    if (!isFlyoutOpen && isPrevFlyoutOpen) {
      const scroller = RefsManager.getRef<HTMLDivElement>(RefKeys.FLYOUT_SCROLLER)
      scroller?.ref.scrollTo({ top: 0 })
    }
  }, [isFlyoutOpen, isPrevFlyoutOpen])

  useEffect(() => {
    if (!isFlyoutFullyOpen && isPrevFlyoutFullyOpen) {
      if (isClient) {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
        const scroller = RefsManager.getRef<HTMLDivElement>(RefKeys.FLYOUT_SCROLLER)
        scroller?.ref.scrollTo({ top: 0 })
      }
    }
  }, [isClient, isFlyoutFullyOpen, isPrevFlyoutFullyOpen])

  return (
    <div className={containerClass} ref={flyoutScroller}>
      {children}
    </div>
  )
}

export const Container = memo(ContainerComponent)
