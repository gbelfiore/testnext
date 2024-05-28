import { ReactNode } from 'react'
import styles from './SliderWrapper.module.css'

interface ISliderWrapperProps {
  children: ReactNode
  onScroll: (e: any) => void
}

const SliderWrapper = ({ children, onScroll }: ISliderWrapperProps) => {
  return (
    <div className={styles.sliderWrapper} onScroll={onScroll}>
      {children}
    </div>
  )
}

export { SliderWrapper }
