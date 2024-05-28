import React, { memo, useMemo } from 'react'
import styles from './Availability.module.css'
import { TKeys } from '~/localization/languages/enum'
import { Translator } from '~/localization/translator'
import { PositionInfo } from '~/components/flyer/flyout/availability/position-info'
import { IFontData } from '~/hooks/use-font-info/typings'
import { getFontInfo } from '~/hooks/use-font-info'
import { useFlyoutProductWithChildrens } from '~/hooks/use-product'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'


const AvailabilityComponent: React.FC = () => {
  //const isAvailable = useFlyoutStore((state) => state.activeProduct?.available)
  const schema = useSchemaStore.getState().schema
  const template = getTemplate(schema)

  const { product } = useFlyoutProductWithChildrens()
  const isAvailable = product.available

  const styleObject = useMemo(() => {
    const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'availability', {
      fontWeight: 400,
      fontSize: 14,
      fontFamily: template?.fonts?.families?.[0]?.name,
      lineHeight: '16px',
    })
    return {
      color: template?.cssVars?.availabilityTextColor,
      ...fontInfo,
    }
  }, [template])

  if (!isAvailable) return null

  return (
    <div className={styles.availability} style={styleObject}>
      <Translator tKey={TKeys.AVAILABLE} capitalizeFirst />
      <PositionInfo />
    </div>
  )
}

export const Availability = memo(AvailabilityComponent)
