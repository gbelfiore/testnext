import type React from 'react'
import { type ICtaOpt } from '~/typings/schemaopt'

type ButtonProps = Partial<ICtaOpt> & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  disabled?: boolean
  children?: React.ReactNode
}

export { ButtonProps };
