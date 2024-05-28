import type React from 'react'
import { type ICtaOpt, type IPriceTagColorsOpt } from '~/typings/schemaopt'


type DiscountInfoProps = IPriceTagColorsOpt & {
  children?: React.ReactNode
}

export { DiscountInfoProps };
