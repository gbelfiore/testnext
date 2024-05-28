import { CSSProperties, useMemo } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { useProduct, useProductWithChildrens } from '~/hooks/use-product'
import useSection from '~/hooks/use-section'
import { getTemplate } from '~/hooks/use-template'
import { useSchemaStore } from '~/state/schema'
import { IProductOpt } from '~/typings/schemaopt'
import ProductUtils from '~/utilities/product/ProductUtils'

interface IProductNameProps {
  sectionIndex: number
  productIndex: number
  productBundleIndex?: number
  ignoreModifier?: boolean
  className?: string
}

const ProductName = ({
  sectionIndex,
  productIndex,
  productBundleIndex,
  ignoreModifier,
  className,
}: IProductNameProps) => {
  const schema = useSchemaStore((state) => state.schema)
  const section = useSection(sectionIndex)
  const { product } = useProductWithChildrens(sectionIndex, productIndex, productBundleIndex)
  const productParent = useProduct(sectionIndex, productIndex)

  const template = getTemplate(schema, section)

  const textColor = useMemo(() => (ignoreModifier ? undefined : product?.textColor), [ignoreModifier, product])
  const modifier = useMemo(() => (ignoreModifier ? undefined : product?.modifier), [ignoreModifier, product])

  const fontInfo = useMemo((): IFontData => {
    const fontFamilies = template?.fonts?.families
    const fontInfoData = template?.fontInfoCssVars

    const fontInfo: IFontData =
      modifier === 'wide'
        ? getFontInfo(fontInfoData, 'productCellWideName', {
            fontWeight: 900,
            fontSize: '16px',
            fontFamily: fontFamilies?.[1]?.name ?? undefined,
            lineHeight: '18px',
            textTransform: 'uppercase',
          })
        : getFontInfo(fontInfoData, 'productCellSingleName', {
            fontWeight: 900,
            fontSize: '18px',
            fontFamily: fontFamilies?.[1]?.name ?? undefined,
            lineHeight: '20px',
            textTransform: 'uppercase',
          })

    return fontInfo
  }, [template, modifier])

  const getTextColor = useMemo(() => {
    return textColor
      ? textColor
      : ProductUtils.checkBundleProduct(productParent as IProductOpt)
        ? template?.cssVars?.bundleProductTextColor
        : template?.cssVars?.productTextColor
  }, [productParent, template?.cssVars?.bundleProductTextColor, template?.cssVars?.productTextColor, textColor])

  const style: CSSProperties = {
    color: getTextColor,
    ...fontInfo,
  }

  if (!product?.name) return null
  return <div style={style} className={className} dangerouslySetInnerHTML={{ __html: product.name }}></div>
}

export { ProductName }
