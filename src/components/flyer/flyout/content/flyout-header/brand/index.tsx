import React, { CSSProperties, useMemo } from 'react'
import { Brand } from '~/components/brand'
import useTemplate from '~/hooks/use-template'
import { useFlyoutStore } from '~/state/flyout'
import { type FlyoutBrandProps } from './typings'



export const HeaderBrand: React.FC<FlyoutBrandProps> = ({ brandHeight, ...props }) => {
  const template = useTemplate()
  const activeSectionIndex = useFlyoutStore((state) => state.activeSectionIndex)
  const activeProductIndex = useFlyoutStore((state) => state.activeProductIndex)
  const activeProductBundleIndex = useFlyoutStore((state) => state.activeProductBundleIndex)

  const brandImageStyle = useMemo((): CSSProperties => {
    return {
      display: 'block',
      alignSelf: 'flex-start',
      maxHeight: brandHeight,
      objectFit: 'contain',
      transition: 'top .3s ease, left .3s ease',
    }
  }, [brandHeight])

  const brandTextStyle = useMemo((): CSSProperties => {
    return {
      color: template?.cssVars.flyoutProductSubNameTextColor ?? template?.cssVars.flyoutProductSubNameTextColor,
      textAlign: 'left',
      float: 'left',
      maxHeight: brandHeight,
      lineHeight: brandHeight,
      objectFit: 'contain',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
      WebkitBoxPack: 'end',
      letterSpacing: 0,
    }
  }, [brandHeight, template])

  return (
    <div {...props}>
      <Brand
        sectionIndex={activeSectionIndex}
        productIndex={activeProductIndex}
        productBundleIndex={activeProductBundleIndex}
        styleBrandImage={brandImageStyle}
        styleBrandText={brandTextStyle}
      />
    </div>
  )
}
