import React, { memo, useMemo } from 'react'
import styles from './Description.module.css'
import { getFontInfo } from '~/hooks/use-font-info'
import { useProductDescription } from '~/hooks/use-product'
import { TKeys } from '~/localization/languages/enum'
import { Translator } from '~/localization/translator'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'
import classNames from 'classnames'
import { CLASS_NAME_FLYOUT_FONTS } from '~/utilities/fonts'

const DescriptionComponent: React.FC = () => {
  const schema = useSchemaStore.getState().schema
  const template = getTemplate(schema)
  const productDescription = useProductDescription()

  const titleStyle = useMemo(() => {
    const fontInfo = getFontInfo(template?.fontInfoCssVars, 'flyoutProductDescription', {
      fontFamily: template?.fonts?.families?.[0]?.name,
    })

    return {
      ...fontInfo,
      fontSize: 14,
      lineHeight: '20px',
    }
  }, [template])

  const contentStyle = useMemo(() => {
    const fontInfo = getFontInfo(template?.fontInfoCssVars, 'flyoutProductDescription', {
      fontFamily: template?.fonts?.families?.[0]?.name,
    })

    return {
      ...fontInfo,
      fontSize: 12,
      lineHeight: '16px',
    }
  }, [template])

  if (!productDescription) return null

  return (
    <div>
      <div className={classNames(styles.title, CLASS_NAME_FLYOUT_FONTS[800])} style={titleStyle}><Translator tKey={TKeys.DESCRIPTION} /></div>
      <div className={classNames(styles.content, CLASS_NAME_FLYOUT_FONTS[400])} style={contentStyle} dangerouslySetInnerHTML={{ __html: productDescription }} />
    </div>
  )
}

export const Description = memo(DescriptionComponent)
