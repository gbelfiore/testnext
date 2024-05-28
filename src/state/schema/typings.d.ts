import { IFontInfoOpt, ISchemaOpt, IProductOpt, IStoreOpt } from '~/typings/schemaopt'
import { TFlatMapProduct } from '~/typings/flatMapProducts.d.ts'

interface ISchemaState {
  schema: ISchemaOpt | null
  nearestStore: IStoreOpt | null
  fontInfo: IFontInfoOpt
  productsCount: number
  flatMapProducts: TFlatMapProduct
  setSchema: (data?: ISchemaOpt) => void
  setFlatMapProducts: (flatMap?: TFlatMapProduct) => void
}

export { ISchemaState }
