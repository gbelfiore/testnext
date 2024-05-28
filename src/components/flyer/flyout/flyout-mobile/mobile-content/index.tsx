import 'react-spring-bottom-sheet/dist/style.css'
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { BottomSheet, type BottomSheetRef } from 'react-spring-bottom-sheet'
import { useFlyoutStore } from '~/state/flyout'
import { Buy } from '~/components/flyer/flyout/buy'
import { RefsManager } from '~/utilities/refs-manager'
import { RefKeys, RefTypes } from '~/utilities/refs-manager/enum'
import { useAppStore } from '~/state/app'
import ProductUtils from '~/utilities/product/ProductUtils'
import { IProductOpt } from '~/typings/schemaopt'
import styles from './MobileContent.module.css'
import { FlyoutBody } from '../../content/flyout-body'
import { ProductStickyHeader } from '../../content/sticky-header/ProductStickyHeader'
import { getOpenFlyoutHeight } from '~/utilities/flyout'
import { FlyoutHeader } from '../../content/flyout-header'
import { useFlyoutCtas } from '~/hooks/use-flyout-ctas'

interface MobileContentProps {
  children?: React.ReactNode
  footerChildren?: React.ReactNode
}

const MobileContentComponent = ({ children, footerChildren }: MobileContentProps) => {
  const isClient = useAppStore((state) => state.isClient)
  const isDesktop = useAppStore((state) => state.isDesktop)

  const contentRef = RefsManager.useReferencesManager({
    refKey: RefKeys.FLYOUT_CONTENT,
    type: RefTypes.DIV,
    removeOnUnmount: false,
  })

  const hasActiveProduct = useFlyoutStore((state) => Boolean(state.activeProduct))
  const hasActiveProductBundle = useFlyoutStore((state) => ProductUtils.checkBundleProduct(state.activeProduct as IProductOpt))
  const isFlyoutOpen = useFlyoutStore((state) => state.isFlyoutOpen)
  const isFlyoutFullyOpen = useFlyoutStore((state) => state.isFlyoutFullyOpen)
  const closeFlyout = useFlyoutStore((state) => state.closeFlyout)
  const setFlyoutFullyOpen = useFlyoutStore((state) => state.setFlyoutFullyOpen)
  const toggleOpenAnimationHasFinished = useFlyoutStore((state) => state.toggleOpenAnimationHasFinished)

  const snapPoints = useMemo(() => {
    const heightOpen = getOpenFlyoutHeight()
    return [heightOpen]
  }, [])

  const stopScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const restoreScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const restoreScroll = useCallback(() => {
    if (isClient) {
      // browser code
      restoreScrollTimeout.current = setTimeout(() => {
        const scroller = document.querySelector('[data-rsbs-scroll]')
        if (scroller) {
          scroller.classList.remove('prevent-scroll')
        }
      }, 100)
    }
  }, [isClient])

  const onSpringStart = useCallback(() => {
    const flyout = RefsManager.getRef<BottomSheetRef>(RefKeys.FLYOUT_CONTENT)
    const start = flyout?.ref.height ?? 0
    requestAnimationFrame(() => {
      const end = flyout?.ref.height ?? 0
      if (start && start === end) {
        // Cancel event
      } else if (end && end < start) {
        // Reducing event
        setFlyoutFullyOpen()
        restoreScroll()
      } else if (!end && end < start) {
        // Closing event
      } else if (end && end > start) {
        // Expanding event
        setFlyoutFullyOpen()
        restoreScroll()
      } else if (!start && !end) {
        // Opening event
        setFlyoutFullyOpen()
        restoreScroll()
      }
    })
  }, [restoreScroll, setFlyoutFullyOpen])

  const getSnapPoints = useCallback(() => snapPoints, [snapPoints])
  const hasCtas = useFlyoutCtas().length > 0

  const header = useMemo(() => {
    return (
      <>
        <FlyoutHeader />
        {!hasActiveProductBundle && <ProductStickyHeader />}
      </>
    )
  }, [hasActiveProductBundle])

  const footer = useMemo(() => {
    if (footerChildren) return footerChildren
    if (!hasCtas) return null

    return (
      <div className={styles.footerShadow} style={{ padding: isDesktop ? '12px 0' : 12 }}>
        <Buy />
      </div>
    )
  }, [footerChildren, hasCtas, isDesktop])

  const open = useMemo(() => isFlyoutOpen || isFlyoutFullyOpen, [isFlyoutFullyOpen, isFlyoutOpen])

  useEffect(() => {
    const stopScrollTimeoutT = stopScrollTimeout.current
    const restoreScrollTimeoutT = restoreScrollTimeout.current
    return () => {
      if (stopScrollTimeoutT) clearTimeout(stopScrollTimeoutT)
      if (restoreScrollTimeoutT) clearTimeout(restoreScrollTimeoutT)
    }
  }, [])

  if (!hasActiveProduct) return null

  return (
    <>
      <BottomSheet
        onDismiss={closeFlyout}
        scrollLocking={false}
        blocking={false}
        header={header}
        footer={footer}
        expandOnContentDrag={true}
        open={open}
        ref={contentRef}
        snapPoints={getSnapPoints}
        onSpringStart={onSpringStart}
        onSpringEnd={toggleOpenAnimationHasFinished}
        reserveScrollBarGap={true}
        skipInitialTransition={true}
      >
        {
          children
            ? children
            : (
              <div> {/* this div is important to avoid issues calculating dynamic positions on FlyoutBody */}
                <FlyoutBody carouselHeight='224px' />
              </div>
            )
        }
      </BottomSheet>
    </>
  )
}

export const MobileContent = memo(MobileContentComponent)
