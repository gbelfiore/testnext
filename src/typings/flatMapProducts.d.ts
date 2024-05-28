type TFlatMapProductElement = {
  product: IProductOpt
  productIndex: number
  section: ISectionOpt
  sectionIndex: number
  parentProduct?: IProductOpt
  variantIndex?: number
}

type TFlatMapProduct = Record<string, TFlatMapProductElement>

export { TFlatMapProduct, TFlatMapProductElement }
