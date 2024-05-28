import React from 'react'
import { IProductOpt } from '~/typings/schemaopt'
import PriceBlockSimple from '../../product/price-block-simple'
import { IProductPrice } from '~/typings/schema'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import { getStaticPath, getStaticPathForWebP } from '~/hooks/use-static-path'
import useTemplate from '~/hooks/use-template'
import { ProductName } from '../content/flyout-body/product-name'
import { ProductSubName } from '../content/flyout-body/product-subname'
import { Specs } from "~/components/flyer/flyout/specs"
import { Description } from '~/components/flyer/flyout/content/flyout-body/description'
import { Availability } from '~/components/flyer/flyout/availability/Availability'
import { Highlights } from '~/components/flyer/flyout/highlights'
import { CollapsableBlocks } from "~/components/flyer/flyout/collapsable-blocks"


interface BundleProductTabProps {
  product: IProductOpt
  index: number
}

const BundleProductTab = ({ index, product }: BundleProductTabProps) => {
  const productImage = product.bundleProducts?.[index].productImage
  const src = getStaticPath(productImage)
  const webp = getStaticPathForWebP(productImage)
  const template = useTemplate()

  return (
    <div className='flex flex-col gap-[8px]'>
      <PictureWebP src={src} webp={webp} style={{ height: 160, width: '100%', objectFit: 'contain' }} />
      <ProductName />
      <ProductSubName />
      {
        product?.bundleProducts?.[index]?.price && (
          <div
            style={{
              marginBottom: 10,
            }}
          >
            <PriceBlockSimple
              isPlain
              textDecoration="auto"
              price={product?.bundleProducts?.[index]?.price as IProductPrice}
              fontFamily={template?.fontInfoCssVars?.productCellSingleNameFontFamily || template?.fonts?.families?.[1].name}
            />
          </div>
        )
      }
      <Specs />
      <Description />
      <Availability />
      <Highlights />
      <CollapsableBlocks />
    </div>
  )
}

export default BundleProductTab
