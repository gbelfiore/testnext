import { ReactNode } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { ColorToSvgFill } from '~/utilities/RgbToHex'
import styles from './StoreItem.module.css'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'
import classNames from 'classnames'

interface IStoreItemProps {
  children: ReactNode
  hasOpenDetails?: boolean
}

const StoreItem = ({ children, hasOpenDetails }: IStoreItemProps) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const colorIcon = ColorToSvgFill(template?.cssVars.storeDistanceTextColor) ?? '%23fff'

  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'storeItem', {
    fontFamily: template?.fonts?.families?.[0]?.name,
    fontWeight: 500,
    fontSize: 14,
  })

  const iconBgImage = `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 896 1024'%3E%3Cpath fill='${colorIcon}' d='M832 704c-16.376 0-32.76-6.25-45.24-18.75l-338.76-338.65-338.8 338.8c-25 25-65.5 25-90.5 0s-25-65.5 0-90.5l384-384c25-25 65.5-25 90.5 0l384 384c25 25 25 65.5 0 90.5-12.4 12.4-28.8 18.6-45.2 18.6z'%3E%3C/path%3E%3C/svg%3E%0A")`

  return (
    <li className={styles.storeItem} style={fontInfo}>
      {children}
      <div
        className={classNames(styles.storeItemIcon, { [styles.storeItemIconOpen as string]: hasOpenDetails })}
        style={{ backgroundImage: iconBgImage }}
      ></div>
    </li>
  )
}

export { StoreItem }
