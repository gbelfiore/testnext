import { useEffect, useRef, useState } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { IFontData } from '~/hooks/use-font-info/typings'
import { getTemplate } from '~/hooks/use-template'
import { EPosition, useFlyerUi } from '~/state/flyer-ui'
import { useSchemaStore } from '~/state/schema'
import ArrowUp from './icons/ArrowUp'
import ArrowDown from './icons/ArrowDown'
import Arrows from './icons/Arrows'
import { TKeys } from '~/localization/languages/enum'
import { Translator } from '~/localization/translator'
import styles from './OffersButton.module.css'
import { useFlyoutStore } from '~/state/flyout'

const OffersToViewButton = () => {
  const isUserScrolling = useFlyerUi((state) => state.isUserScrolling)
  const viewedOffers = useFlyerUi((state) => state.viewedOffers)
  const position = useFlyerUi.getState().position

  const timeoutOut = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const timeoutIn = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const { schema, productsCount } = useSchemaStore.getState()
  const isUserOnboarded = useFlyerUi((state) => state.isUserOnboarded)
  const [isVisibleState, setIsVisibleState] = useState(false)
  const viewedOffersCount = viewedOffers ? Object.keys(viewedOffers).length : 0
  const productsToViewCount = productsCount - viewedOffersCount
  const isFlyoutOpen = useFlyoutStore((state) => state.isFlyoutOpen);
  
  useEffect(() => {
    clearTimeout(timeoutOut.current)
    if (isVisibleState) {
      timeoutOut.current = setTimeout(() => {
        useFlyerUi.getState().setIsUserScrolling(undefined)
        setIsVisibleState(false)
      }, 3000)
    }
  }, [isVisibleState])
  useEffect(() => {
    clearTimeout(timeoutIn.current)
    if (!isUserScrolling && isUserOnboarded && !isFlyoutOpen) {
      timeoutIn.current = setTimeout(() => {
        setIsVisibleState(true)
        useFlyerUi.getState().setIsUserScrolling(false)
      }, 7000)
    }
  }, [isFlyoutOpen, isUserOnboarded, isUserScrolling])

  useEffect(() => {
    if (isUserScrolling || isFlyoutOpen) {
      setIsVisibleState(false)
    }
  }, [isFlyoutOpen, isUserScrolling])

  const template = getTemplate(schema)
  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'pill', {
    fontFamily: template?.fonts?.families?.[0]?.name,
    fontWeight: 700,
    fontSize: 12,
  })

  const backgroundColor = template?.cssVars?.activePillBackgroundColor
  const textAndIconColor = template?.cssVars?.activePillTextColor
  const style = {
    backgroundColor: backgroundColor,
    color: textAndIconColor,
    ...fontInfo,
  }

  return (
    <div className={isVisibleState ? styles.containerIn : styles.containerOut}>
      {productsToViewCount > 0 && (
        <div style={style} className={styles.innerContainer}>
          {position === EPosition.TOP && <ArrowDown fill={textAndIconColor || 'white'} className={styles.bounce} />}
          {position === EPosition.BOTTOM && <ArrowUp fill={textAndIconColor || 'white'} className={styles.bounce} />}
          {position === EPosition.MIDDLE && <Arrows fill={textAndIconColor || 'white'} className={styles.bounce} />}
          <div style={{ display: 'flex', gap: 3 }}>
            <div>{productsToViewCount}</div>
            <div>{productsToViewCount === 1 ? <Translator tKey={TKeys.OFFER_TO_SEE} /> : <Translator tKey={TKeys.OFFERS_TO_SEE} />}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OffersToViewButton
