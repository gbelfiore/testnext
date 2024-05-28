import React from 'react'
import styles from './Scroller.module.css'
import { ScrollerProps } from './typings'

export const Scroller: React.FC<ScrollerProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={styles.scroller}>
      { children }
    </div>
  )
}
