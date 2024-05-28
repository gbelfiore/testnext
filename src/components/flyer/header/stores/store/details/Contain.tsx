import { ReactNode } from 'react'
import styles from './Details.module.css'

interface IContainProps {
  children: ReactNode
}

const Contain = ({ children }: IContainProps) => {
  return <div className={styles.contain}>{children}</div>
}

export { Contain }
