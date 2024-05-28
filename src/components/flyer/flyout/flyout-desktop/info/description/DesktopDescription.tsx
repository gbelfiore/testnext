import React, { memo, useMemo } from 'react'
import styles from './DesktopDescription.module.css'
import { getFontInfo } from '~/hooks/use-font-info'
import { useProductDescription } from '~/hooks/use-product'
import { TKeys } from '~/localization/languages/enum'
import { Translator } from '~/localization/translator'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'


const DesktopDescriptionComponent: React.FC = () => {
  const schema = useSchemaStore.getState().schema
  const template = getTemplate(schema)
  const productDescription = useProductDescription()

  const titleStyle = useMemo(() => {
    return getFontInfo(template?.fontInfoCssVars, 'flyoutProductDescription', {
      fontSize: 16,
      lineHeight: '19.2px',
      fontFamily: template?.fonts?.families?.[0]?.name,
      fontWeight: 700,
    })
  }, [template])

  const contentStyle = useMemo(() => {
    return getFontInfo(template?.fontInfoCssVars, 'flyoutProductDescription', {
      fontSize: 16,
      lineHeight: '19.2px',
      fontFamily: template?.fonts?.families?.[0]?.name,
      fontWeight: 400,
    })
  }, [template])

  if (!productDescription) return null

  return (
    <div className={styles.desktopDescription}>
      <div className={styles.title} style={titleStyle}><Translator tKey={TKeys.DESCRIPTION} /></div>
      <div style={contentStyle} dangerouslySetInnerHTML={{ __html: productDescription }} />
    </div>
  )
}

export const DesktopDescription = memo(DesktopDescriptionComponent)
