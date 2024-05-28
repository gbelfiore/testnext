import { IProductPriceOpt } from '~/typings/schemaopt'
import { ITplSchema } from '~/typings/template'

interface PriceTagProps {
  price: IProductPriceOp
  priceBlockTransformOrigin: string
  className?: string
  selectedBadge?: IProductOpt['selectedBadge']
}

interface BottomContentProps {
  fontSize?: number
  shadowed?: boolean
  hasFullPrice?: boolean
}

export { PriceTagProps, BottomContentProps }
