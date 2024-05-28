import styles from './SliderDots.module.css'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'
import { ReactNode } from 'react'

interface ISliderDotProps {
  children?: ReactNode
  active: boolean
}

const SliderDot = ({ children, active }: ISliderDotProps) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const backgroundColor = active ? template?.cssVars.activeDotColor : template?.cssVars.dotColor

  return (
    <li className={styles.sliderDot} style={{ backgroundColor }}>
      {children}
    </li>
  )
}

export { SliderDot }
