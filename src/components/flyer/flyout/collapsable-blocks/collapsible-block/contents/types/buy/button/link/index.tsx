import React, { useMemo } from 'react'
import styles from './ButtonLink.module.css'
import { ButtonLinkProps } from './typings'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'
import classNames from 'classnames'
import { CLASS_NAME_FLYOUT_FONTS } from '~/utilities/fonts'

const ButtonLink: React.FC<ButtonLinkProps> = ({
  color, alternate, disabled, children,
  target = '_blank',
  draggable = false,
  rel = 'noopener noreferrer',
  ...props
}) => {
  const schema = useSchemaStore.getState().schema
  const template = getTemplate(schema)

  const styleObject = useMemo(() => {
    const backgroundColor = color ? color : alternate ? template?.cssVars?.alternateCtaBackgroundColor : template?.cssVars?.ctaBackgroundColor
    const textColor = alternate ? template?.cssVars?.alternateCtaTextColor : template?.cssVars?.ctaTextColor

    const disabledStyle = disabled
      ? {
        pointerEvents: "none" as React.CSSProperties["pointerEvents"],
        opacity: 0,
      }
      : undefined

    return {
      color: textColor,
      backgroundColor: backgroundColor,
      ...disabledStyle,
      fontSize: 14,
      lineHeight: '20px',
      height: '40px',
    }
  }, [template, alternate, color, disabled])

  const buttonProps = useMemo(() => {
    return {
      style: styleObject,
      className: classNames(styles.buttonLink, CLASS_NAME_FLYOUT_FONTS[400]),
      target,
      draggable,
      rel,
      ...props
    }
  }, [styleObject, target, draggable, rel, props])

  return (
    <a {...buttonProps}>
      {children}
    </a>
  )
}

export { ButtonLink }
