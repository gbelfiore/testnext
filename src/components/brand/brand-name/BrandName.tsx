import { CSSProperties, memo, useMemo } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { IFontData } from '~/hooks/use-font-info/typings'
import { useProductWithChildrens } from '~/hooks/use-product'
import useSection from '~/hooks/use-section'
import useTemplate from '~/hooks/use-template'

interface BrandTextProps {
  sectionIndex: number
  productIndex: number
  productBundleIndex?: number | null
  isMergeStyle?: boolean
  style?: CSSProperties
}

const BrandTextComponent = ({ sectionIndex, productIndex, productBundleIndex, isMergeStyle = false, style }: BrandTextProps) => {
  const section = useSection(sectionIndex)
  const { product } = useProductWithChildrens(sectionIndex, productIndex, productBundleIndex)
  const template = useTemplate(section)

  const fontInfo = useMemo((): IFontData | null => {
    const fontFamilies = template?.fonts?.families
    const fontInfoData = template?.fontInfoCssVars

    if (fontInfoData) {
      const fontInfo: IFontData =
        product?.modifier === 'wide'
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
    }
    return null
  }, [product, template])

  const getSubTextColor = useMemo(() => {
    return product?.subTextColor ?? template?.cssVars?.productSubTextColor
  }, [template, product])

  const getStyle = useMemo((): CSSProperties => {
    let styleDefault: CSSProperties = { color: getSubTextColor, ...fontInfo }
    if (style) {
      if (isMergeStyle) {
        styleDefault = { ...styleDefault, ...style }
      } else {
        styleDefault = style
      }
    }

    return styleDefault
  }, [fontInfo, getSubTextColor, isMergeStyle, style])

  return <div style={getStyle}>{product?.brandText}</div>
}

export const BrandText = memo(BrandTextComponent)
