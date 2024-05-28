import React, { CSSProperties, useMemo } from 'react'
import { Brand } from '~/components/brand'
import useTemplate from '~/hooks/use-template'
import { useFlyoutStore } from '~/state/flyout'

export const BrandComponent = () => {
  const template = useTemplate()
  const activeSectionIndex = useFlyoutStore((state) => state.activeSectionIndex)
  const activeProductIndex = useFlyoutStore((state) => state.activeProductIndex)
  const activeProductBundleIndex = useFlyoutStore((state) => state.activeProductBundleIndex)

  const brandImageStyle = useMemo((): CSSProperties => {
    return {
      display: 'block',
      alignSelf: 'flex-start',
      maxWidth: 80,
      maxHeight: 30,
      objectFit: 'contain',
      transition: 'top .3s ease, left .3s ease',
    }
  }, [])

  const brandTextStyle = useMemo((): CSSProperties => {
    return {
      color: template?.cssVars.flyoutProductSubNameTextColor ?? template?.cssVars.flyoutProductSubNameTextColor,
      float: 'left',
      minWidth: 80,
      maxHeight: 30,
      objectFit: 'contain',
      transition: 'top .3s ease, left .3s ease',
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
