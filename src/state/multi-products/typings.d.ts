import { type IProductOpt } from '~/typings/schemaopt'

interface IMultiProductsState {
  activeProducts: {
    [sectionIndex: number]: {
      [productIndex: number]: number
    }
  }

  setVariantIndex: (sectionIndex: number, productIndex: number, variantIndex?: number) => void
}

export { IMultiProductsState }
