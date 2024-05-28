import React, { memo, useMemo } from 'react'
import { Ctas as PriceButtons } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/buy/ctas/Ctas'
import { CloseNav } from '~/components/flyer/flyout/close-nav/CloseNav'
import { useFlyoutStore } from '~/state/flyout'
import { Buy } from '~/components/flyer/flyout/buy'
import { Backdrop } from '~/components/flyer/flyout/backdrop/Backdrop'
import { Scroller } from '~/components/flyer/flyout/scroller'
import { BottomWrapper } from '~/components/flyer/flyout/bottom-wrapper'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'
import ProductUtils from '~/utilities/product/ProductUtils'
import ContentBundle from '../content-bundle'
import styles from './FlyoutDesktop.module.css'
import { useFlyoutCtas } from '~/hooks/use-flyout-ctas'
import { FlyoutBody } from '../content/flyout-body'
import { FlyoutHeader } from '../content/flyout-header'


const FlyoutDesktopComponent = () => {
  const { schema } = useSchemaStore.getState()
  const template = getTemplate(schema)
  const withShadows = template?.cssVars?.withShadows
  const flyoutOpen = useFlyoutStore((state) => state.isFlyoutOpen)
  const currentProduct = useFlyoutStore((state) => state.activeProduct)
  const isBundle = currentProduct && ProductUtils.checkBundleProduct(currentProduct)
  const hasCtas = useFlyoutCtas().length > 0

  const containerStyle = useMemo(() => {
    return {
      transform: flyoutOpen ? 'translateY(0)' : 'translateY(101%)',
      boxShadow: withShadows ? '0px 0px 10px' : 'none',
    }
  }, [flyoutOpen, withShadows])

  const content = () => {
    return (
      <>
        <FlyoutHeader />
        <Scroller>
          <div className={styles.innerScroller}>
            <FlyoutBody carouselHeight='296px' />
          </div>
        </Scroller>
        {
          hasCtas && (
            <BottomWrapper className='p-[32px]'>
              <Buy />
            </BottomWrapper>
          )
        }
      </>
    )
  }

  return (
    <>
      <Backdrop />
      <div className={styles.container} style={containerStyle}>
        {isBundle ? (
          <>
            <CloseNav />
            <ContentBundle paddingProductTab='24px' />
            {
              hasCtas && (
                <BottomWrapper>
                  <PriceButtons isVertical={false} />
                </BottomWrapper>
              )
            }
          </>
        ) : (
          content()
        )}
      </div>
    </>
  )
}

const FlyoutDesktop = memo(FlyoutDesktopComponent)
export { FlyoutDesktop as default, BottomWrapper }
