import { ReactNode } from 'react'
import styles from './ProductOuter.module.css'

interface IProductOuterProps {
  children: ReactNode
}

const ProductOuter = ({ children }: IProductOuterProps) => {
  return <div className={styles.productOuter}>{children}</div>
}

export { ProductOuter }
