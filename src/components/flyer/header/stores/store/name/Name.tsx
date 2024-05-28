import { ReactNode } from 'react'
import styles from './Name.module.css'

interface INameProps {
  children: ReactNode
}

const Name = ({ children }: INameProps) => {
  return <div className={styles.name}>{children}</div>
}

export { Name }
