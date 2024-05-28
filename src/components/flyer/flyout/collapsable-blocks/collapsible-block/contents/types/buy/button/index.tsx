import React, { useMemo } from 'react'
import styles from './Button.module.css'
import { getFontInfo } from '~/hooks/use-font-info'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { ButtonProps } from './typings'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'


const Button: React.FC<ButtonProps> = ({ color, alternate, disabled, children, ...props }) => {
  const schema = useSchemaStore.getState().schema
  const template = getTemplate(schema)

  const styleObject = useMemo(() => {
    const backgroundColor = color ? color : alternate ? template?.cssVars?.alternateCtaBackgroundColor : template?.cssVars?.ctaBackgroundColor
    const textColor = alternate ? template?.cssVars?.alternateCtaTextColor : template?.cssVars?.ctaTextColor

    const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'cta', {
      fontWeight: 400,
      fontSize: 16,
      fontFamily: template?.fonts?.families?.[0]?.name,
      lineHeight: 'normal',
    })

    const disabledStyle = disabled
    ? {
      pointerEvents: "none" as React.CSSProperties["pointerEvents"],
      opacity: 0,
    }
    : undefined

    return {
      color: textColor,
      backgroundColor,
      ...fontInfo,
      ...disabledStyle,
    }
  }, [template, color, alternate, disabled])

  return (
    <div className={styles.button} style={styleObject} {...props}>
      {children}
    </div>
  )
}

export { Button }
export { ButtonLink } from './link'