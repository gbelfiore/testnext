import React, { memo, useMemo } from "react"
import styles from './FlyoutHeader.module.css'
import { HeaderBrand } from "./brand"
import { Handler } from "./handler"
import { ShareButton } from "./share-button"
import { useAppStore } from "~/state/app"
import { getFlyoutHeaderHeight } from "~/utilities/flyout"

const FlyoutHeaderComponent = () => {
  const isDesktop = useAppStore(state => state.isDesktop) || false
  const style = useMemo(() => ({ height: getFlyoutHeaderHeight(isDesktop) }), [isDesktop])

  return (
    <header className={styles.header} style={style}>
      <HeaderBrand className={styles.brand} brandHeight={isDesktop ? '24px' : '20px'} />
      <ShareButton />
      <Handler closeButton={isDesktop ? 'close' : 'arrow'} />
    </header>
  )
}

export const FlyoutHeader = memo(FlyoutHeaderComponent)
