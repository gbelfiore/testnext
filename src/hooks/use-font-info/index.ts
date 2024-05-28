import { isEmpty } from 'lodash-es'
import { CSSProperties } from 'react'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { useAppStore } from '~/state/app'
import { type ITplFontInfoCssVars, type ITplSchema } from '~/typings/template'
import {
  type IFontInfoCssVars,
  type ITplPriceComponent,
  type ITplPriceComponentFontInfoCssVars,
} from '~/typings/templateComponents'
import { Manipulator } from '~/utilities/manipulator'

const cleanFontData = (fontData: CSSProperties | IFontData): IFontData => {
  Object.keys(fontData).forEach((key) => {
    if (isEmpty(fontData[key as keyof (CSSProperties | IFontData)])) {
      delete fontData[key as keyof (CSSProperties | IFontData)]
      delete fontData[key as keyof (CSSProperties | IFontData)]
    }
  })
  return fontData as IFontData
}

const mergeValueFontData = (
  fontData: CSSProperties | IFontData,
  defaultFontData?: CSSProperties | IFontData
): IFontData => {
  const newFontData: CSSProperties | IFontData = {
    ...(defaultFontData ?? {}),
    ...fontData,
  }
  return newFontData as IFontData
}

const getNewFontInfo = (fontInfo: CSSProperties, defaultFontData?: CSSProperties): CSSProperties => {
  let fontData: CSSProperties = {
    fontFamily: fontInfo?.fontFamily,
    fontSize: fontInfo?.fontSize ? Manipulator.normalizeFontSize(fontInfo.fontSize as string | undefined) : undefined,
    fontWeight: fontInfo?.fontWeight,
    letterSpacing: fontInfo?.letterSpacing,
    lineHeight: fontInfo?.lineHeight,
    textTransform: fontInfo?.textTransform as any,
  }

  fontData = cleanFontData(fontData)
  fontData = mergeValueFontData(fontData, defaultFontData)
  return fontData
}

const getFontInfo = (
  fontInfo: ITplFontInfoCssVars | null | undefined,
  prefix: string,
  defaultFontData?: IFontData
): IFontData => {
  const isDesktop = useAppStore.getState().isDesktop
  const fontFamilyKey = `${prefix}FontFamily` as keyof ITplFontInfoCssVars
  const fontSizeKey = `${prefix}FontSize` as keyof ITplFontInfoCssVars
  const fontSizeDesktopKey = `${prefix}FontSizeDesktop` as keyof ITplFontInfoCssVars
  const fontWeightKey = `${prefix}FontWeight` as keyof ITplFontInfoCssVars
  const letterSpacingKey = `${prefix}LetterSpacing` as keyof ITplFontInfoCssVars
  const lineHeightKey = `${prefix}LineHeight` as keyof ITplFontInfoCssVars
  const lineHeightDesktopKey = `${prefix}LineHeightDesktop` as keyof ITplFontInfoCssVars
  const textTransformKey = `${prefix}TextTransform` as keyof ITplFontInfoCssVars

  let computedFontSizeKey = fontSizeKey
  let computedLineHightKey = lineHeightKey
  if (isDesktop) {
    if (fontInfo?.[fontSizeDesktopKey]) computedFontSizeKey = fontSizeDesktopKey
    if (fontInfo?.[lineHeightDesktopKey]) computedLineHightKey = lineHeightDesktopKey
  }
  let fontData: IFontData = {
    fontFamily: fontInfo?.[fontFamilyKey],
    fontSize: fontInfo?.[computedFontSizeKey]
      ? Manipulator.normalizeFontSize(fontInfo[computedFontSizeKey] as string | undefined)
      : undefined,
    fontWeight: fontInfo?.[fontWeightKey],
    letterSpacing: fontInfo?.[letterSpacingKey],
    lineHeight: fontInfo?.[computedLineHightKey],
    textTransform: fontInfo?.[textTransformKey] as any,
  }

  fontData = cleanFontData(fontData)
  fontData = mergeValueFontData(fontData, defaultFontData)
  return fontData
}

const getCombineFontInfo = (
  dataTemplate: CSSProperties,
  dataTemplateComponent: CSSProperties,
  defaultFontData?: CSSProperties
): IFontData => {
  console.log('getCombineFontInfo')

  let fontDataByTemplateComponent: CSSProperties = getNewFontInfo(dataTemplateComponent, defaultFontData)
  fontDataByTemplateComponent = cleanFontData(dataTemplateComponent)
  const fontData = cleanFontData(dataTemplate)
  const resultFontData = mergeValueFontData(fontDataByTemplateComponent, fontData)
  return resultFontData
}

const getFontInfoPriceFromTemplateComponent = (
  keyFontInfoData: keyof ITplPriceComponentFontInfoCssVars,
  fontInfoCssVars?: ITplPriceComponentFontInfoCssVars
): CSSProperties => {
  const fontInfoDataByTemplateComponent = fontInfoCssVars?.[keyFontInfoData] as IFontInfoCssVars
  if (isEmpty(fontInfoCssVars?.[keyFontInfoData])) {
    return {}
  }
  const isDesktop = useAppStore.getState().isDesktop
  fontInfoDataByTemplateComponent.fontSize =
    isDesktop && fontInfoDataByTemplateComponent.fontSizeDesktop
      ? fontInfoDataByTemplateComponent.fontSizeDesktop
      : fontInfoDataByTemplateComponent.fontSize
  fontInfoDataByTemplateComponent.lineHeight =
    isDesktop && fontInfoDataByTemplateComponent.lineHeightDesktop
      ? fontInfoDataByTemplateComponent.lineHeightDesktop
      : fontInfoDataByTemplateComponent.lineHeight
  return fontInfoDataByTemplateComponent as CSSProperties
}

const getFontInfoOnPrice = (
  keyFontInfoData: keyof ITplPriceComponentFontInfoCssVars,
  defaultFontInfoData?: IFontData,
  template?: ITplSchema | null,
  templateComponentPrice?: ITplPriceComponent | null
) => {
  const fontInfoData = template?.fontInfoCssVars
  let fontInfo = getFontInfo(fontInfoData, keyFontInfoData, defaultFontInfoData)
  if (fontInfoData && templateComponentPrice) {
    const fontInfoDataByTemplateComponent = getFontInfoPriceFromTemplateComponent(
      keyFontInfoData,
      templateComponentPrice.fontInfoCssVars
    )

    fontInfo = getCombineFontInfo(fontInfo, fontInfoDataByTemplateComponent, defaultFontInfoData)
  }

  return fontInfo
}

export { getFontInfo, getFontInfoOnPrice }
