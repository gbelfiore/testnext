import React, { memo } from 'react'
import useTemplate from '~/hooks/use-template'
import { useFlyoutStore } from '~/state/flyout'
import styles from './CloseNav.module.css'

const CloseNavComponent: React.FC = () => {
  const template = useTemplate()
  const closeFlyout = useFlyoutStore((state) => state.closeFlyout)

  return (
    <div className={styles.closeNav}>
      <div className={styles.closeButton} onClick={closeFlyout}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill={template?.cssVars.flyoutCloseIconColor ?? '#000'} xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9 7.58861L16.2783 0.3103C17.2192 -0.630624 18.6306 0.780762 17.6897 1.72169L10.4114 9L17.6897 16.2783C18.0794 16.6681 18.0794 17.3 17.6897 17.6897C17.3 18.0794 16.6681 18.0794 16.2783 17.6897L9 10.4114L1.72169 17.6897C0.780762 18.6306 -0.630624 17.2192 0.3103 16.2783L7.58861 9L0.3103 1.72169C-0.0794433 1.33194 -0.0794433 0.700044 0.3103 0.3103C0.700044 -0.0794433 1.33194 -0.0794433 1.72169 0.3103L9 7.58861Z" fill="#282832" />
        </svg>
      </div>
    </div>
  )
}

export const CloseNav = memo(CloseNavComponent)
