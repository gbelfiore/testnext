import { ReactNode } from 'react'
import styles from './SliderDots.module.css'

interface ISliderDotsProps {
  children: ReactNode
}

const SliderDots = ({ children }: ISliderDotsProps) => {
  return <ol className={styles.sliderDots}>{children}</ol>
}

export { SliderDots }
