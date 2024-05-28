import React, { forwardRef } from 'react'
import styles from './ProductVariants.module.css'
import { useMultiProductsStore } from '~/state/multi-products'
import { IProductOpt } from '~/typings/schemaopt'
import { useProductWithChildrens } from '~/hooks/use-product'
import { CarouselVariant } from './CarouselVariant'
import { useSchemaStore } from '~/state/schema'
import useSection from '~/hooks/use-section'
import { getTemplate } from '~/hooks/use-template'
import { ProductVariantsSelector } from './ProductVariantsSelector'
import ProductUtils from '~/utilities/product/ProductUtils'

type Props = {
  sectionIndex: number
  productIndex: number
  isExpanded?: boolean
}

const ProductVariants = forwardRef<HTMLDivElement, Props>(({ sectionIndex, productIndex, isExpanded = false }, ref) => {
  const schema = useSchemaStore.getState().schema
  const section = useSection(sectionIndex)
  const template = getTemplate(schema, section)

  const { parent, variantIndex } = useProductWithChildrens(sectionIndex, productIndex)

  const renderItem = (product: IProductOpt, index?: number) => {
    const isSelected = index === variantIndex

    const onClick = (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      useMultiProductsStore.getState().setVariantIndex(sectionIndex, productIndex, index)
    }

    return <CarouselVariant key={`variant_${product.id}_${index}`} parent={parent} product={product} isSelected={isSelected} onClick={onClick} />
  }

  if (!ProductUtils.checkVariantsProduct(parent)) return null

  return (
    <div className={styles.productVariants} ref={ref}>
      <ProductVariantsSelector
        template={template}
        parent={parent}
        products={parent?.children ?? []}
        productsLimit={2}
        renderItem={renderItem}
        isExpanded={isExpanded}
      />
    </div>
  )
})

export default ProductVariants
