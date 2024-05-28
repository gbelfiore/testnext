import { useMultiImagesStore } from '~/state/multi-images'
import { useProductWithChildrens } from '../use-product'
import { IProductOpt, TProductImageOpt } from '~/typings/schemaopt'
import ProductUtils from '~/utilities/product/ProductUtils'

type UseMultiImagesType = {
  index: number
  parent?: IProductOpt
  product?: IProductOpt
  variantIndex?: number
  sliderImages?: TProductImageOpt[]
  isMultiImages: boolean
}

const useMultiImages = (sectionIndex: number, productIndex: number): UseMultiImagesType => {
  const { parent, product, variantIndex } = useProductWithChildrens(sectionIndex, productIndex)

  const isMultiImages = ProductUtils.checkMultiImageProduct(product)
  const sliderImages = isMultiImages && product.productMultiImages ? [product.productImage, ...product.productMultiImages] : []

  const index = useMultiImagesStore((state) => {
    const currentSection = state.activeImages?.[sectionIndex]
    const currentProduct = currentSection?.[productIndex]
    const currentVariant = variantIndex && currentProduct?.[variantIndex + 1]

    return currentVariant ?? 0
  })

  return { index, product, variantIndex, parent, isMultiImages: isMultiImages ?? false, sliderImages }
}

export { useMultiImages }
