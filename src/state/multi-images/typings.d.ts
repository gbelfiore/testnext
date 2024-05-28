import { type IProductOpt } from '~/typings/schemaopt'

interface IMultiImagesState {
  activeImages: {
    [sectionIndex: number]: {
      [productIndex: number]: {
        [variantIndex: number]: number
      }
    }
  }

  setImageIndex: (sectionIndex: number, productIndex: number, variantIndex: number, imageIndex: number) => void
}

export { IMultiImagesState }
