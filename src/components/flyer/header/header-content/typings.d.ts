import type { ISchemaOpt } from '~/typings/schemaopt'
import { TFlatMapProduct } from '~/typings/flatMapProducts'

interface HeaderContentProps {
  openSection?: (id: ISectionOpt['id']) => void
  schema: ISchemaOpt
  isSearch?: boolean
  urlParams?: { slug: string; flyerId: string }
  flatMapProducts?: TFlatMapProduct
}

export { HeaderContentProps }
