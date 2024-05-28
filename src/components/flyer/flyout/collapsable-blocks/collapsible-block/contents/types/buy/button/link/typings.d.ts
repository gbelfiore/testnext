import type React from 'react'
import { type ICtaOpt } from '~/typings/schemaopt'

type ButtonLinkProps = Partial<ICtaOpt> & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
  disabled?: boolean
  children?: React.ReactNode
}

export { ButtonProps, ButtonLinkProps };
