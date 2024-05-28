import { ReactNode } from 'react'

import styles from './Details.module.css'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'

interface IConsoleProps {
  children: ReactNode
}

const Console = ({ children }: IConsoleProps) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const borderBottomColor = template?.cssVars?.storeDetailSeparatedLineColor ?? '#FFF'
  return (
    <div className={styles.console} style={{ borderBottomColor }}>
      {children}
    </div>
  )
}

export { Console }
