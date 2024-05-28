import { ITplSchema } from '~/typings/template'
import { LegacyRef, ReactNode, forwardRef } from 'react'
import styles from './Container.module.css'

interface IContainerProps {
  children: ReactNode
  template?: ITplSchema | null
  isSearch?: boolean
}

const Container = forwardRef(({ children, isSearch, template }: IContainerProps, ref: LegacyRef<HTMLElement> | undefined) => {
  return (
    <section ref={ref} className={styles.container}>
      {children}
    </section>
  )
})

export { Container }
