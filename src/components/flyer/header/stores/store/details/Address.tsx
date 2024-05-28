

import { ColorToSvgFill } from '~/utilities/RgbToHex'
import styles from './Details.module.css'
import { CSSProperties, ReactNode } from 'react'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'

const Address = ({ children }: { children: ReactNode }) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)

  const style: CSSProperties = {
    borderBottomColor: template?.cssVars.storeDetailSeparatedLineColor ?? '#FFF',
    color: template?.cssVars.storeDetailAddressTextColor ?? '#FFF',
  }

  const colorIcon = ColorToSvgFill(template?.cssVars?.storeDetailAddressTextColor) ?? '%23fff'

  const backgroundImageIcon = `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 640 640'%3E%3Cpath fill='${colorIcon}' d='M636.884 579.264l-43.744-131.264h-48l26.656 128h-469.312l26.656-128h-48l-43.776 131.264c-11.104 33.408 8.576 60.736 43.776 60.736h512c35.2 0 54.88-27.328 43.744-60.736zM497.141 160c0-88.352-71.616-160-160-160s-160 71.648-160 160c0 152.8 160 320 160 320s160-167.2 160-320zM250.741 161.92c0-47.712 38.656-86.368 86.4-86.368s86.4 38.656 86.4 86.368c0 47.744-38.688 86.4-86.4 86.4s-86.4-38.688-86.4-86.4z'%3E%3C/path%3E%3C/svg%3E%0A")`

  return (
    <div className={styles.address} style={style}>
      <div className={styles.addressIcon} style={{ backgroundImage: backgroundImageIcon }}></div>
      {children}
    </div>
  )
}

export { Address }
