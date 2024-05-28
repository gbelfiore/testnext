import { useMemo } from 'react'
import { useFlyoutStore } from '~/state/flyout'
import { useMultiProductsStore } from '~/state/multi-products'
import { useSchemaStore } from '~/state/schema'
import { type TMedia } from '~/typings/schema'
import { type IMediaProductOpt, type IProductOpt } from '~/typings/schemaopt'
import ProductUtils from '~/utilities/product/ProductUtils'
import { StringManipulator } from '~/utilities/string-manipulator'

const useProduct = (
  sectionIndex: number | undefined | null,
  productIndex: number | undefined | null,
  productBundleIndex?: number | null
): IProductOpt | undefined => {
  const schema = useSchemaStore.getState().schema
  if (sectionIndex == undefined || productIndex == undefined) return undefined

  if (productBundleIndex != undefined || productBundleIndex != null) {
    return schema?.sections?.[sectionIndex]?.products?.[productIndex]?.bundleProducts?.[productBundleIndex]
  }

  return schema?.sections?.[sectionIndex]?.products?.[productIndex]
}

const useProductWithChildrens = (
  sectionIndex: number | undefined | null,
  productIndex: number | undefined | null,
  productBundleIndex?: number | null
): { parent?: IProductOpt; product: IProductOpt; variantIndex?: number } => {
  const product = useProduct(sectionIndex, productIndex, productBundleIndex)

  const variantIndex = useMultiProductsStore((state) => {
    if (!ProductUtils.checkVariantsProduct(product)) return -1
    const currentSection = state.activeProducts?.[sectionIndex ?? 0]
    return currentSection?.[productIndex ?? 0]
  })

  const currentProduct = variantIndex >= 0 ? product?.children?.[variantIndex] : product

  const combinedProduct = { ...product, ...currentProduct } as IProductOpt

  return {
    parent: product,
    product: combinedProduct,
    variantIndex: variantIndex ?? -1,
  }
}

const useFlyoutProductWithChildrens = () => {
  const activeProductIndex = useFlyoutStore((state) => state.activeProductIndex)
  const activeSectionIndex = useFlyoutStore((state) => state.activeSectionIndex)
  const activeProductBundleIndex = useFlyoutStore((state) => state.activeProductBundleIndex)
  return { ...useProductWithChildrens(activeSectionIndex, activeProductIndex, activeProductBundleIndex) }
}

const useProductDescription = () => {
  const { product } = useFlyoutProductWithChildrens()
  const productDescription = useMemo(() => StringManipulator.replaceAll(product?.description, '\\u', 'U+'), [product?.description])
  return productDescription
}

const useMediaProduct = (sectionIndex: number | undefined | null, mediaIndex: number | undefined | null): IMediaProductOpt<TMedia> | undefined => {
  const { schema } = useSchemaStore((state) => state)
  if (sectionIndex == undefined || mediaIndex == undefined) return undefined
  return schema?.sections?.[sectionIndex]?.products?.[mediaIndex]
}

export { useProduct, useProductWithChildrens, useMediaProduct, useFlyoutProductWithChildrens, useProductDescription }
