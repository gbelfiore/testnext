import { type IVirtualItemFlyerProps } from './typings'
import styles from './VirtualFlyerItem.module.css'
import classNames from 'classnames'

const VirtualItemFlyer = ({ children, addStyle, isSticky, isColophon, height }: IVirtualItemFlyerProps) => {
  // const style = isSticky ? { ...addStyle, height: height * 0.5 } : { ...addStyle, height: height }
  if (isColophon) {
    addStyle.minHeight = height
    addStyle.height = 'unset'
  } else {
    if (isSticky) {
      addStyle.height = height * 0.5
      addStyle.top = -1
    } else {
      addStyle.height = height
    }
  }

  return (
    <div
      className={classNames(styles.virtualItemFlyer, {
        [styles.virtualItemFlyerSticky as string]: isSticky,
      })}
      style={addStyle}
    >
      {children}
    </div>
  )
}

export default VirtualItemFlyer
