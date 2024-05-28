import React, { CSSProperties, memo, useCallback, useMemo } from 'react'
import { RefsManager } from '~/utilities/refs-manager'
import { RefKeys, RefTypes } from '~/utilities/refs-manager/enum'
import styles from './Handler.module.css'
import { getTemplate } from '~/hooks/use-template'
import { useSchemaStore } from '~/state/schema'
import { useFlyoutStore } from '~/state/flyout'
import { HandlerProps } from './typings'


const ArrowButton = () => {
  const schema = useSchemaStore((state) => state.schema)
  const svgStyle = useMemo((): CSSProperties => {
    const template = getTemplate(schema)

    return {
      fill: template?.cssVars?.flyoutHandlerColor || 'none',
    }
  }, [schema])

  return (
    <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.5364 7.10919C4.18493 6.75772 3.61508 6.75772 3.2636 7.10919C2.91213 7.46066 2.91213 8.03051 3.2636 8.38198L10.0908 15.2092C11.1452 16.2636 12.8548 16.2636 13.9092 15.2092L20.7364 8.38198C21.0879 8.03051 21.0879 7.46066 20.7364 7.10919C20.3849 6.75772 19.8151 6.75772 19.4636 7.10919L12.6364 13.9364C12.2849 14.2879 11.7151 14.2879 11.3636 13.9364L4.5364 7.10919Z" fill="#282832" />
    </svg>
  )
}

const CloseButton = () => {
  const schema = useSchemaStore((state) => state.schema)
  const svgStyle = useMemo((): CSSProperties => {
    const template = getTemplate(schema)

    return {
      fill: template?.cssVars?.flyoutHandlerColor || 'none',
    }
  }, [schema])

  return (
    <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path d="M8 9.32886L1.60287 15.726C1.42829 15.9006 1.20884 15.9899 0.944512 15.9939C0.680209 15.998 0.45672 15.9087 0.274044 15.726C0.091348 15.5433 0 15.3218 0 15.0615C0 14.8013 0.091348 14.5798 0.274044 14.3971L6.67114 8L0.274044 1.60287C0.0994393 1.42829 0.0101192 1.20884 0.00608406 0.944513C0.00202788 0.680209 0.091348 0.45672 0.274044 0.274044C0.45672 0.091348 0.678192 0 0.93846 0C1.19873 0 1.4202 0.091348 1.60287 0.274044L8 6.67114L14.3971 0.274044C14.5717 0.0994393 14.7912 0.0101192 15.0555 0.00608406C15.3198 0.00202788 15.5433 0.091348 15.726 0.274044C15.9087 0.45672 16 0.678191 16 0.938459C16 1.19873 15.9087 1.4202 15.726 1.60287L9.32886 8L15.726 14.3971C15.9006 14.5717 15.9899 14.7912 15.9939 15.0555C15.998 15.3198 15.9087 15.5433 15.726 15.726C15.5433 15.9087 15.3218 16 15.0615 16C14.8013 16 14.5798 15.9087 14.3971 15.726L8 9.32886Z" fill="#282832" />
    </svg>
  )
}

const HandlerComponent: React.FC<HandlerProps> = ({ closeButton, onClick, }) => {
  const closeFlyout = useFlyoutStore((state) => state.closeFlyout)

  const handlerRef = RefsManager.useReferencesManager({
    refKey: RefKeys.FLYOUT_HANDLER,
    type: RefTypes.BUTTON,
    removeOnUnmount: false,
  })

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) return onClick(event)
    closeFlyout()

  }, [onClick, closeFlyout])

  return (
    <button className={styles.handler} type="button" onClick={handleClick} ref={handlerRef}>
      {
        closeButton === 'arrow' && <ArrowButton />
      }
      {
        closeButton === 'close' && <CloseButton />
      }
    </button>
  )
}

export const Handler = memo(HandlerComponent)
