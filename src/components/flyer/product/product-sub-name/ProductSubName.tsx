import { useMemo } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { useProduct, useProductWithChildrens } from '~/hooks/use-product'
import useSection from '~/hooks/use-section'
import { getTemplate } from '~/hooks/use-template'
import { useSchemaStore } from '~/state/schema'
import { IProductOpt } from '~/typings/schemaopt'
import ProductUtils from '~/utilities/product/ProductUtils'
import styles from './ProductSubName.module.css'

interface IProductSubNameProps {
  sectionIndex: number
  productIndex: number
  productBundleIndex?: number
  ignoreModifier?: boolean
}

const ProductSubName = ({ sectionIndex, productIndex, productBundleIndex, ignoreModifier }: IProductSubNameProps) => {
  const schema = useSchemaStore.getState().schema
  const section = useSection(sectionIndex)
  const { product } = useProductWithChildrens(sectionIndex, productIndex, productBundleIndex)
  const productParent = useProduct(sectionIndex, productIndex)
  // const product = useProduct(sectionIndex, productIndex, productBundleIndex)
  const template = getTemplate(schema, section)

  const subTextColor = useMemo(() => (ignoreModifier ? undefined : product?.subTextColor), [ignoreModifier, product])
  const modifier = useMemo(() => (ignoreModifier ? undefined : product?.modifier), [ignoreModifier, product])

  const fontInfo = useMemo((): IFontData => {
    const fontFamilies = template?.fonts?.families
    const fontInfoData = template?.fontInfoCssVars

    const fontInfo: IFontData =
      modifier === 'wide'
        ? getFontInfo(fontInfoData, 'productCellWideSubName', {
            fontWeight: 900,
            fontSize: '9px',
            fontFamily: fontFamilies?.[1]?.name ?? undefined,
            lineHeight: '18px',
            textTransform: 'uppercase',
          })
        : getFontInfo(fontInfoData, 'productCellSingleSubName', {
            fontWeight: 900,
            fontSize: '9px',
            fontFamily: fontFamilies?.[1]?.name ?? undefined,
            lineHeight: '20px',
            textTransform: 'uppercase',
          })

    return fontInfo
  }, [template, modifier])

  const getSubTextColor = useMemo(() => {
    return subTextColor
      ? subTextColor
      : ProductUtils.checkBundleProduct(productParent as IProductOpt)
        ? template?.cssVars?.bundleProductTextColor
        : template?.cssVars?.productSubTextColor
  }, [subTextColor, productParent, template?.cssVars?.bundleProductTextColor, template?.cssVars?.productSubTextColor])

  const style = {
    color: getSubTextColor,
    ...fontInfo,
  }

  if (!product?.subName) return null

  return <div style={style} className={styles.productSubName} dangerouslySetInnerHTML={{ __html: product.subName }}></div>
}

export { ProductSubName }
