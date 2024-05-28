import { CSSProperties } from 'react'

interface ProductProps {
  sectionIndex: number
  productIndex: number
  productBundleIndex?: number
  ignoreModifier?: boolean
  indexForBackground?: number
  addCustomStyle?: CSSProperties
}

export { ProductProps }
