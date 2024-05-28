import React from 'react'
import ProductRoot from '../../product-root/ProductRoot'
import ProductUtils from '~/utilities/product/ProductUtils'
import { CellBottomProps } from './typings'
import { ProductSubName } from '../../product-sub-name/ProductSubName'

function CellBottom({ parent, product, productIndex, sectionIndex }: CellBottomProps) {
  /* React Hooks here */

  const { subNameHeight, variantsHeight } = ProductUtils.getCellSizes(product)

  return (
    <>
      {/* {ProductUtils.checkSubNameProduct(product) && (
        <div
          className="px-[8px]"
          style={{
            height: subNameHeight,
          }}
        >
          <div className="line-clamp-2 overflow-hidden" dangerouslySetInnerHTML={{ __html: product?.subName }}></div>
        </div>
      )} */}

      {ProductUtils.checkSubNameProduct(product) && (
        <div
          className="line-clamp-2 overflow-hidden px-[8px]"
          style={{
            height: subNameHeight,
          }}
        >
          <ProductSubName productIndex={productIndex} sectionIndex={sectionIndex} />
        </div>
      )}

      {ProductUtils.checkVariantsProduct(parent) && (
        <div
          className="px-[8px]"
          style={{
            height: variantsHeight,
          }}
        >
          <ProductRoot optionsCount={product.children?.length} />
        </div>
      )}
    </>
  )
}

export default CellBottom
