import { CSSProperties } from 'react'

interface ProductWrapperProps {
  productIndex: number
  sectionIndex: number
  ignoreModifier?: boolean
  ghost: boolean
  onClick?: () => void
  children?: React.ReactNode
  indexForBackground?: number
  addCustomStyle?: CSSProperties
}

export { ProductWrapperProps }
