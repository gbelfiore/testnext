import React, { CSSProperties, useMemo } from 'react'
import { Brand } from '~/components/brand'
import useTemplate from '~/hooks/use-template'
import { useFlyoutStore } from '~/state/flyout'

export const DesktopBrand = () => {
  const template = useTemplate()
  const activeSectionIndex = useFlyoutStore((state) => state.activeSectionIndex)
  const activeProductIndex = useFlyoutStore((state) => state.activeProductIndex)
  const activeProductBundleIndex = useFlyoutStore((state) => state.activeProductBundleIndex)

  const brandImageStyle = useMemo((): CSSProperties => {
    return {
      display: 'block',
      alignSelf: 'flex-start',
      maxHeight: 32,
      objectFit: 'contain',
      transition: 'top .3s ease, left .3s ease',
    }
  }, [])

  const brandTextStyle = useMemo((): CSSProperties => {
    return {
      color: template?.cssVars.flyoutProductSubNameTextColor ?? template?.cssVars.flyoutProductSubNameTextColor,
      float: 'left',
      textAlign: 'left',
      maxHeight: 32,
      objectFit: 'contain',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
      WebkitBoxPack: 'end',
      letterSpacing: 0,
    }
  }, [template])

  return (
    <Brand
      sectionIndex={activeSectionIndex}
      productIndex={activeProductIndex}
      productBundleIndex={activeProductBundleIndex}
      styleBrandImage={brandImageStyle}
      styleBrandText={brandTextStyle}
    />
  )
}
