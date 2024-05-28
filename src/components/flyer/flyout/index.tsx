import React, { memo, useCallback, useEffect, useRef } from 'react'
import { useFlyoutStore } from '~/state/flyout'
import { useAppStore } from '~/state/app'
import dynamic from 'next/dynamic'

const FlyoutDesktopComponent = dynamic(() => import(/* webpackChunkName: "FlyoutDesktop"*/ './flyout-desktop'))
const FlyoutMobileComponent = dynamic(() => import(/* webpackChunkName: "FlyoutMobile"*/ './flyout-mobile'))


const FlyoutComponent = () => {
  const isClient = useAppStore((state) => state.isClient)
  const isDesktop = useAppStore((state) => state.isDesktop)
  const lastScrollY = useRef(globalThis.scrollY)
  const closeFlyout = useFlyoutStore((state) => state.closeFlyout)
  const isFlyoutOpen = useFlyoutStore((state) => state.isFlyoutOpen)

  useEffect(() => {
    // Close flyout on go back
    // globalThis.onpopstate = () => {
    //   if (isFlyoutOpen) {
    //     closeFlyout();
    //     globalThis.history.pushState({}, "");
    //   } else {
    //     globalThis.history.go(-1);
    //   }
    // };
    if (isClient) {
      // browser code
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isFlyoutOpen) closeFlyout()
      })
    }
  }, [closeFlyout, isClient, isFlyoutOpen])

  useEffect(() => {
    const subscription = useFlyoutStore.subscribe(
      (state) => state.isFlyoutFullyOpen,
      (isFlyoutFullyOpen) => {
        if (!isDesktop && isClient) {
          const isLocked = document.body.style.overflow === 'hidden'
          if (isFlyoutFullyOpen && !isLocked) {
            document.body.style.overflow = 'hidden'
          } else if (!isFlyoutFullyOpen && isLocked) {
            document.body.removeAttribute('style')
          }
        }
      }
    )

    return () => {
      subscription()
    }
  }, [isClient, isDesktop])

  const handleScroll = useCallback(() => {
    if (lastScrollY.current !== globalThis.scrollY && isFlyoutOpen) {
      lastScrollY.current = globalThis.scrollY
      closeFlyout()
    }
  }, [closeFlyout, isFlyoutOpen])

  useEffect(() => {
    globalThis.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      globalThis.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])


  return (
    <>
      {isDesktop && <FlyoutDesktopComponent />}
      {!isDesktop && <FlyoutMobileComponent />}
    </>
  )
}

const Flyout = memo(FlyoutComponent)
export default Flyout
