import React from 'react'
import styles from './BuyWrapper.module.css'
import { BuyWrapperProps } from '~/components/flyer/flyout/buy/buy-wrapper/typings'

const BuyWrapper: React.FC<BuyWrapperProps> = ({ children }) => {
  return (
    <div className={styles.buyWrapper}>
      {children}
    </div>
  )
}

export { BuyWrapper }
