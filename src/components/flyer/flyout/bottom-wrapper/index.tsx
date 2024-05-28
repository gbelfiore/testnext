import React, { memo } from 'react'
import styles from './BottomWrapper.module.css'
import { BottomWrapperProps } from './typings'
import classNames from 'classnames'

const BottomWrapperComponent: React.FC<BottomWrapperProps> = ({ children, ...props }) => {
  return (
    <div {...props} className={classNames(styles.bottomWrapper, props.className)}>
      { children }
    </div>
  )
}

export const BottomWrapper = memo(BottomWrapperComponent)
