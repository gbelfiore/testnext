import { ReactNode } from 'react'
import { ITplSchema } from '~/typings/template'

interface ButtonProps {
  children?: ReactNode
  template?: ITplSchema | null
  onClick(): onClick
}

export { ButtonProps }
