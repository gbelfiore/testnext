import React, { useMemo, useState } from 'react'

import NavBarBundle from '../nav-bar-bundle'
import { useFlyoutStore } from '~/state/flyout'
import Bundled from '../../product/bundled'
import { IProductOpt } from '~/typings/schemaopt'
import OtherInfo from './OtherInfo'
import BundleProductTab from './BundleProductTab'
import { Scroller } from '../scroller'

const comboIndex = -1

interface ContentBundleProps {
  paddingProductTab?: string | number
}

const ContentBundle = ({ paddingProductTab }: ContentBundleProps) => {
  const { activeProduct, activeProductIndex, activeSectionIndex, setActiveProductBundleIndex } = useFlyoutStore((state) => state)
  const [currentBundleProductId, setCurrentBundleProductId] = useState(comboIndex)
  const scrollerStyle = useMemo(() => ({ padding: 0 }), [])

  return (
    <>
      <NavBarBundle
        inFlyout
        currentBundleProductId={currentBundleProductId}
        onSelect={(id: number) => {
          setCurrentBundleProductId(id)
          if (id > comboIndex) {
            setActiveProductBundleIndex(id)
          }
        }}
      />
      {currentBundleProductId === comboIndex ? (
        <>
          <Scroller style={scrollerStyle}>
            <Bundled
              isMiniSection
              product={activeProduct as IProductOpt}
              productIndex={activeProductIndex as number}
              sectionIndex={activeSectionIndex as number}
            />
            <OtherInfo description={activeProduct?.bundleInfo?.otherInfo || ''} />
          </Scroller>
        </>
      ) : (
        <Scroller style={{ padding: paddingProductTab }}>
          <BundleProductTab product={activeProduct as IProductOpt} index={currentBundleProductId} />
        </Scroller>
      )}
    </>
  )
}

export { ContentBundle as default, comboIndex }
