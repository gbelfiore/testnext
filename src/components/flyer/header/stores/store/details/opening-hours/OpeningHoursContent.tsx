import { CSSProperties, ReactNode } from 'react'
import styles from './OpeningHours.module.css'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'

interface IOpeningHoursContentProps {
  children: ReactNode
}

const OpeningHoursContent = ({ children }: IOpeningHoursContentProps) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)

  const style: CSSProperties = {
    borderBottomColor: template?.cssVars?.storeDetailSeparatedLineColor ?? '#fff',
    color: template?.cssVars?.storeDetailTitleTextColor ?? '#FFF',
  }

  return (
    <div className={styles.openingHoursContent} style={style}>
      {children}
    </div>
  )
}

export default OpeningHoursContent
