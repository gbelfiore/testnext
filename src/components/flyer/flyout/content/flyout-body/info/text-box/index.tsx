import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react'
import styles from './TextBox.module.css'
import { Translator } from '~/localization/translator'
import { TKeys } from '~/localization/languages/enum'
import { RefsManager } from '~/utilities/refs-manager'
import { RefKeys, RefTypes } from '~/utilities/refs-manager/enum'
import classNames from 'classnames'
import { CLASS_NAME_FLYOUT_FONTS } from '~/utilities/fonts'
import { getFlyoutHeaderHeight, getOpenFlyoutHeight } from '~/utilities/flyout'
import { isDesktop } from 'react-device-detect'


interface InfoComponentProps {
  children?: React.ReactNode
}


const ChevronArrow: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => {
  const style: CSSProperties = useMemo(() => {
    return {
      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)'
    }
  }, [isExpanded])

  return (
    <svg style={style} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.02426 4.73954C2.78995 4.50523 2.41005 4.50523 2.17574 4.73954C1.94142 4.97386 1.94142 5.35375 2.17574 5.58807L6.72721 10.1395C7.43015 10.8425 8.56985 10.8425 9.27279 10.1395L13.8243 5.58807C14.0586 5.35375 14.0586 4.97386 13.8243 4.73954C13.5899 4.50523 13.2101 4.50523 12.9757 4.73954L8.42426 9.29101C8.18995 9.52533 7.81005 9.52533 7.57574 9.29101L3.02426 4.73954Z" fill="#282832" />
    </svg>
  )
}

function useTextBoxSizeProps(isExpanded: boolean) {
  // we are computing values in phases
  const textBox = RefsManager.getRef<HTMLDivElement>(RefKeys.FLYOUT_TEXT_BOX)?.ref
  const productVariants = RefsManager.getRef<HTMLDivElement>(RefKeys.FLYOUT_PRODUCT_VARIANTS)?.ref

  const [phase1State, setPhase1State] = useState({
    isInitialized: false,
    maxHeight: 0 as string | number
  })

  const [phase2State, setPhase2State] = useState({
    isInitialized: false,
    isExpandible: false,
  })

  useEffect(function computePhase1() {
    if (phase1State.isInitialized) return // only compute single time
    if (!textBox || !productVariants) return // wait for dependencies to be ready

    const visibleFlyoutBodyHeight = getOpenFlyoutHeight() - getFlyoutHeaderHeight(isDesktop)

    let lastValue = -1
    const interval = setInterval(() => {
      const productVariantsRect = productVariants.getBoundingClientRect()
      const textBoxMaxHeight = visibleFlyoutBodyHeight - textBox.offsetTop - productVariantsRect.height - 28
      const stable = lastValue === textBoxMaxHeight
      if (stable) {
        clearInterval(interval)
        setPhase1State({
          isInitialized: true,
          maxHeight: textBoxMaxHeight > 30 ? textBoxMaxHeight : 0,
        })
      }

      lastValue = textBoxMaxHeight
    }, 20)

    return () => {
      clearInterval(interval)
    }
  }, [phase1State, textBox, productVariants])

  useEffect(function computePhase2() {
    if (phase2State.isInitialized) return // only compute single time
    if (!phase1State.isInitialized || !textBox) return // wait for dependencies to be ready

    setPhase2State({
      isInitialized: true,
      isExpandible: textBox.scrollHeight > textBox.clientHeight
    })
  }, [phase1State, phase2State, textBox])

  if (!productVariants) {
    return {
      maxHeight: 'unset',
      isExpandible: false,
    }
  }

  return {
    maxHeight: isExpanded ? 'unset' : phase1State.maxHeight,
    isExpandible: phase2State.isExpandible,
  }
}

const TextBoxComponent = ({ children }: InfoComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const textContentRef = RefsManager.useReferencesManager({
    refKey: RefKeys.FLYOUT_TEXT_BOX,
    type: RefTypes.DIV,
  })

  const { isExpandible, maxHeight } = useTextBoxSizeProps(isExpanded)

  const onClick = useCallback(() => {
    if (!isExpandible) return
    setIsExpanded(!isExpanded)
  }, [isExpandible, isExpanded])

  return (
    <div>
      <div ref={textContentRef} className={styles.content} onClick={onClick} style={{ maxHeight }}>
        {children}
        {
          isExpandible && !isExpanded && <div className={styles.bottomShadow} />
        }
      </div>
      {
        isExpandible && (
          <button className={styles.viewMoreButton} onClick={onClick}>
            <span className={classNames(styles.viewMoreText, CLASS_NAME_FLYOUT_FONTS[800])}><Translator tKey={isExpanded ? TKeys.VIEW_LESS : TKeys.VIEW_MORE} /></span>
            <ChevronArrow isExpanded={isExpanded} />
          </button>
        )
      }
    </div>
  )
}

export const TextBox = TextBoxComponent
