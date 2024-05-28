import { useFlyoutStore } from '~/state/flyout'
import { Nav } from '../../header/nav'
import { useSchemaStore } from '~/state/schema'
import { CSSProperties } from 'react'
import { getTemplate } from '~/hooks/use-template'
import { RefKeys } from '~/utilities/refs-manager/enum'
import { Pill } from '../../header/pill'
import { comboIndex } from '../content-bundle'
import { useAppStore } from '~/state/app'
import { TKeys } from '~/localization/languages/enum'
import { Translator } from '~/localization/translator'

interface NavBarBundleProps {
  currentBundleProductId: number
  inFlyout?: boolean
  onSelect: (id: number) => void
}

const NavBarBundle = ({ currentBundleProductId, onSelect, inFlyout }: NavBarBundleProps) => {
  const currentProduct = useFlyoutStore((state) => state.activeProduct)
  const isDesktop = useAppStore((state) => state.isDesktop)

  const { schema } = useSchemaStore.getState()
  const template = getTemplate(schema)

  const style: CSSProperties = {
    backgroundColor: template?.cssVars?.headerBackgroundColor ?? 'transparent',
    color: template?.cssVars?.headerTextColor ?? 'transparent',
    display: 'flex',
    flexDirection: 'row',
    transition: 'all 0.3s linear',
    padding: 20,
    // marginTop: isDesktop ? 50 : undefined,
    borderRadius: inFlyout && isDesktop ? 'none' : inFlyout && !isDesktop ? '15px 15px 0 0' : 'none',
  }

  const maxPillWidth = 144

  return (
    schema && (
      <div style={style}>
        <Pill schema={schema} selected={currentBundleProductId === comboIndex} onClick={() => onSelect(comboIndex)}>
          <Translator tKey={TKeys.COMBO} />
        </Pill>
        <Nav navKey={RefKeys.NAV_3} schema={schema}>
          {currentProduct?.bundleProducts?.map((product, index) => {
            const id = `${product.name}${index}`
            return (
              <Pill
                key={id}
                id={id}
                maxWidth={maxPillWidth}
                selected={index === currentBundleProductId}
                onClick={() => onSelect(index)}
                schema={schema}
                navKey={RefKeys.NAV_3}
                isFullPage={false}
              >
                {product.name}
              </Pill>
            )
          })}
        </Nav>
      </div>
    )
  )
}

export default NavBarBundle
