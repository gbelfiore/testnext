import React, { memo, useMemo } from 'react'
import styles from './DesktopProductSubName.module.css'
import { getFontInfo } from '~/hooks/use-font-info'
import { IFontData } from '~/hooks/use-font-info/typings'
import { useFlyoutProductWithChildrens } from '~/hooks/use-product'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'

const DesktopProductSubNameComponent: React.FC = () => {
  const schema = useSchemaStore.getState().schema
  const template = getTemplate(schema)
  const { product } = useFlyoutProductWithChildrens()

  const styleObject = useMemo(() => {
    const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'flyoutProductSubName', {
      fontWeight: 400,
      fontSize: 12,
      fontFamily: template?.fonts?.families?.[1]?.name,
      lineHeight: '14.09px',
    })
    
    return {
      ...fontInfo,
      color: product.flyoutSubTextColor ?? product.subTextColor ?? template?.cssVars?.flyoutProductSubNameTextColor,
    }
  }, [template, product])


  if (!product?.subName) return null

  return (
    <div
      className={styles.desktopProductSubName}
      style={styleObject}
      dangerouslySetInnerHTML={{ __html: product?.subName }}
    />
  )
}

export const DesktopProductSubName = memo(DesktopProductSubNameComponent)
