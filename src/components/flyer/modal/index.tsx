import { IS_USER_ONBOARDED, useSchemaStore } from '~/state/schema'
import Lottie from 'lottie-react'
import scrollHand from './scroll-hand.json'
import { useFlyerUi } from '~/state/flyer-ui'
import { TKeys } from '~/localization/languages/enum'
import { Translator } from '~/localization/translator'
import { getFontInfo } from '~/hooks/use-font-info'
import { IFontData } from '~/hooks/use-font-info/typings'
import { getTemplate } from '~/hooks/use-template'
import classNames from 'classnames'
import styles from './Modal.module.css'
import { useEffect } from 'react'
import { getItemFromLocalStorage, setItemIntoLocalStorage } from '~/utilities/storage'
import { useAppStore } from '~/state/app'

const Modal = () => {
  const isBackoffice = useAppStore.getState().isBackoffice

  useEffect(() => {
    const stringifiedValue = getItemFromLocalStorage(IS_USER_ONBOARDED)
    const isUserOnboarded = stringifiedValue ? Boolean(stringifiedValue) : false
    useFlyerUi.getState().setIsUserOnboarded(isUserOnboarded)
  })
  const { schema } = useSchemaStore.getState()
  const isUserOnboarded = useFlyerUi((state) => state.isUserOnboarded)

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setItemIntoLocalStorage(IS_USER_ONBOARDED, 'true')
    useFlyerUi.getState().setIsUserOnboarded(true)
  }
  const template = getTemplate(schema)
  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'pill', {
    fontFamily: template?.fonts?.families?.[0]?.name,
    fontWeight: 700,
    fontSize: 12,
  })
  if (isUserOnboarded || isBackoffice) return null
  return (
    <div
      style={{
        ...fontInfo,
      }}
      className={classNames(styles.container, !isUserOnboarded ? styles.containerOpen : styles.containerClosed)}
    >
      {<Lottie animationData={scrollHand} loop={true} style={{ width: '250px', height: '250px' }} />}
      <div className={styles.buttonContainer}>
        <Translator tKey={TKeys.SCROLL_DOWN_TO_VIEW_MORE_OFFERS} />
      </div>
      <button onClick={onClick} style={{ ...fontInfo }} className={styles.gotItButton}>
        <Translator tKey={TKeys.GOT_IT} />
      </button>
    </div>
  )
}

export default Modal
