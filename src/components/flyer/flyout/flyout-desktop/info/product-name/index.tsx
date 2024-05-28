import React, { memo, useMemo } from 'react'
import styles from './DesktopProductName.module.css'
import { getFontInfo } from '~/hooks/use-font-info'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { useFlyoutProductWithChildrens } from '~/hooks/use-product'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'


const DesktopProductNameComponent: React.FC = () => {
  const schema = useSchemaStore.getState().schema
  const template = getTemplate(schema)
  const { product } = useFlyoutProductWithChildrens()

  const styleObject = useMemo(() => {
    const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'flyoutProductName', {
      fontWeight: 700,
      fontSize: 24,
      fontFamily: template?.fonts?.families?.[1]?.name,
      lineHeight: '28.8px',
    })

    return {
      ...fontInfo,
      color: product?.flyoutTextColor ?? product?.textColor ?? template?.cssVars?.flyoutProductNameTextColor,
    }
  }, [template, product])

  if (!product?.name) return null

  return (
    <div
      className={styles.desktopProductName}
      style={styleObject}
      dangerouslySetInnerHTML={{ __html: product?.name }}
    />
  )
}

export const DesktopProductName = memo(DesktopProductNameComponent)
