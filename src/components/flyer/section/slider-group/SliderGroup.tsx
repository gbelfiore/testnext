import { ReactNode } from 'react'
import styles from './SliderGroup.module.css'

interface ISliderGroupProps {
  children: ReactNode
}

const SliderGroup = ({ children }: ISliderGroupProps) => {
  return <div className={styles.sliderGroup}>{children}</div>
}

export { SliderGroup }
