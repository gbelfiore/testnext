import { IPriceTagColors, ITransformOrigin } from '~/typings/common'
import eFormatPrice from '~/typings/eFormatPrice'
import { ITplComponents } from '~/typings/templateComponents'

interface ITplRetailerInfo {
  logo: string
  poi?: string
  icon: string
  favicon: string
  performanceCheckLimit?: number
}

interface ITplPriceInfo {
  priceTagWidth: number
  priceTagHeight: number
  priceTagZoom?: number
  priceTagZoomFlyout?: number
  priceTrasform?: string
  centerPriceVertically: boolean
  priceDecimalSeparator: string
  discountDecimalSeparator: string
}

interface ITplFont {
  name: string
  source?: string
}

interface ITplFonts {
  source?: string
  families?: ITplFont[]
}

interface ITplCssVars extends IPriceTagColors {
  withShadows?: boolean
  bodyBackgroundColor: string
  sectionBackgroundColor: string
  sectionHeadingBackgroundColor: string
  sectionHeadingTextColor: string
  headerBackgroundColor: string
  headerTextColor: string
  pillBackgroundColor: string
  pillTextColor: string
  activePillBackgroundColor: string
  activePillTextColor: string
  dotColor: string
  gridColor?: string
  gridThickness?: string
  activeDotColor: string
  phoneTextColor: string
  searchInputBackgroundColor: string
  searchInputTextColor: string
  searchInputCaretColor: string
  colophonBackgroundColor: string
  colophonTextColor: string
  productTextColor: string
  productSubTextColor: string
  productBackgroundColor: string
  productBackgroundAlternativeColor: string
  productBackgroundWideColor: string
  navShadowBackgroundColor: string
  flyoutProductNameTextColor: string
  flyoutProductSubNameTextColor: string
  highlightBackgroundColor: string
  highlightTextColor: string
  collapsibleBlockBackgroundColor: string
  collapsibleBlockTextColor: string
  flyoutHandlerColor: string
  flyoutCloseBackgroundColor: string
  flyoutCloseIconColor: string
  flyoutBackgroundColor: string
  pairedProductBackgroundColor: string
  availabilityTextColor: string
  retailerLocationTextColor: string
  flyoutShadowColor: string
  ctaBackgroundColor: string
  ctaTextColor: string
  alternateCtaBackgroundColor: string
  alternateCtaTextColor: string
  pageSectionTitleTextColor: string
  pageSectionBackIconColor: string
  pageSectionSearchIconColor: string
  storeAddressTextColor: string
  storeCityTextColor: string
  storeDistanceTextColor: string
  storeDetailAddressTextColor: string
  storeDetailTitleTextColor: string
  storeOpenBadgeTextColor: string
  storeOpenBadgeBackgroundColor: string
  storeOpenBadgeActiveTextColor: string
  storeOpenBadgeActiveBackgroundColor: string
  storeDayColor: string
  storeOpeningHoursColor: string
  storeDetailSeparatedLineColor: string

  bundleHeaderTextColor: string
  bundleHeaderBackgroundColor: string
  bundleBackgroundColor: string
  bundleSubTextColor: string
  bundleProductBackgroundColor: string
  bundleProductTextColor: string
  bundleProductBorderColor: string
  bundleIconPlusColor: string
}

interface ITplBadge {
  name: string
  src: string
  width?: string
  height?: string
  top?: string
  left?: string
  transformOrigin?: ITransformOrigin
  translateX?: string
  translateY?: string
  rotation?: string
  flyoutWidth?: string
  flyoutHeight?: string
  flyoutTop?: string
  flyoutLeft?: string
  flyoutTransformOrigin?: ITransformOrigin
  flyoutTranslateX?: string
  flyoutTranslateY?: string
  flyoutRotation?: string
}

interface ITplFontInfoCssVars {
  pairedProductTextFontSize: string
  pairedProductTextFontSizeDesktop: string
  pairedProductTextFontWeight: string
  pairedProductTextFontFamily: string
  pairedProductTextLineHeight: string
  pairedProductTextLineHeightDesktop: string
  pairedProductTextLetterSpacing: string
  pairedProductTextTextTransform: string

  storeItemFontSize: string
  storeItemFontSizeDesktop: string
  storeItemFontWeight: string
  storeItemFontFamily: string
  storeItemLineHeight: string
  storeItemLineHeightDesktop: string
  storeItemLetterSpacing: string
  storeItemTextTransform: string

  searchSectionTitleFontSize: string
  searchSectionTitleFontSizeDesktop: string
  searchSectionTitleFontWeight: string
  searchSectionTitleFontFamily: string
  searchSectionTitleLineHeight: string
  searchSectionTitleLineHeightDesktop: string
  searchSectionTitleLetterSpacing: string
  searchSectionTitleTextTransform: string

  suggestionItemFontSize: string
  suggestionItemFontSizeDesktop: string
  suggestionItemFontWeight: string
  suggestionItemFontFamily: string
  suggestionItemLineHeight: string
  suggestionItemLineHeightDesktop: string
  suggestionItemLetterSpacing: string
  suggestionTextTransform: string

  searchInputFontSize: string
  searchInputFontSizeDesktop: string
  searchInputFontWeight: string
  searchInputFontFamily: string
  searchInputLineHeight: string
  searchInputLineHeightDesktop: string
  searchInputLetterSpacing: string
  searchInputTextTransform: string

  searchClearFontSize: string
  searchClearFontSizeDesktop: string
  searchClearFontWeight: string
  searchClearFontFamily: string
  searchClearLineHeight: string
  searchClearLineHeightDesktop: string
  searchClearLetterSpacing: string
  searchClearTextTransform: string

  searchDataFontSize: string
  searchDataFontSizeDesktop: string
  searchDataFontWeight: string
  searchDataFontFamily: string
  searchDataLineHeight: string
  searchDataLineHeightDesktop: string
  searchDataLetterSpacing: string
  searchDataTextTransform: string

  retailerLocationFontSize: string
  retailerLocationFontSizeDesktop: string
  retailerLocationFontWeight: string
  retailerLocationFontFamily: string
  retailerLocationLineHeight: string
  retailerLocationLineHeightDesktop: string
  retailerLocationLetterSpacing: string
  retailerLocationTextTransform: string

  pillFontSize: string
  pillFontSizeDesktop: string
  pillFontWeight: string
  pillFontFamily: string
  pillLineHeight: string
  pillLineHeightDesktop: string
  pillLetterSpacing: string
  pillTextTransform: string

  searchItemFontSize: string
  searchItemFontSizeDesktop: string
  searchItemFontWeight: string
  searchItemFontFamily: string
  searchItemLineHeight: string
  searchItemLineHeightDesktop: string
  searchItemLetterSpacing: string
  searchItemTextTransform: string

  flyoutProductNameFontSize: string
  flyoutProductNameFontSizeDesktop: string
  flyoutProductNameFontWeight: string
  flyoutProductNameFontFamily: string
  flyoutProductNameLineHeight: string
  flyoutProductNameLineHeightDesktop: string
  flyoutProductNameLetterSpacing: string

  flyoutProductNameReducedFontSize: string
  flyoutProductNameReducedFontSizeDesktop: string
  flyoutProductNameReducedFontWeight: string
  flyoutProductNameReducedFontFamily: string
  flyoutProductNameReducedLineHeight: string
  flyoutProductNameReducedLineHeightDesktop: string
  flyoutProductNameReducedLetterSpacing: string
  flyoutProductNameReducedTextTransform: string

  flyoutProductSubNameFontSize: string
  flyoutProductSubNameFontSizeDesktop: string
  flyoutProductSubNameFontWeight: string
  flyoutProductSubNameFontFamily: string
  flyoutProductSubNameLineHeight: string
  flyoutProductSubNameLineHeightDesktop: string
  flyoutProductSubNameLetterSpacing: string

  flyoutProductSubNameReducedFontSize: string
  flyoutProductSubNameReducedFontSizeDesktop: string
  flyoutProductSubNameReducedFontWeight: string
  flyoutProductSubNameReducedFontFamily: string
  flyoutProductSubNameReducedLineHeight: string
  flyoutProductSubNameReducedLineHeightDesktop: string
  flyoutProductSubNameReducedLetterSpacing: string
  flyoutProductSubNameReducedTextTransform: string

  flyoutProductDescriptionFontSize: string
  flyoutProductDescriptionFontSizeDesktop: string
  flyoutProductDescriptionFontWeight: string
  flyoutProductDescriptionFontFamily: string
  flyoutProductDescriptionLineHeight: string
  flyoutProductDescriptionLineHeightDesktop: string
  flyoutProductDescriptionLetterSpacing: string
  flyoutProductDescriptionTextTransform: string

  highlightsSmallFontSize: string
  highlightsSmallFontSizeDesktop: string
  highlightsSmallFontWeight: string
  highlightsSmallFontFamily: string
  highlightsSmallLineHeight: string
  highlightsSmallLineHeightDesktop: string
  highlightsSmallLetterSpacing: string
  highlightsSmallTextTransform: string

  highlightsFontSize: string
  highlightsFontSizeDesktop: string
  highlightsFontWeight: string
  highlightsFontFamily: string
  highlightsLineHeight: string
  highlightsLineHeightDesktop: string
  highlightsLetterSpacing: string
  highlightsTextTransform: string

  collapsibleBlockHandlerFontSize: string
  collapsibleBlockHandlerFontSizeDesktop: string
  collapsibleBlockHandlerFontWeight: string
  collapsibleBlockHandlerFontFamily: string
  collapsibleBlockHandlerLineHeight: string
  collapsibleBlockHandlerLineHeightDesktop: string
  collapsibleBlockHandlerLetterSpacing: string
  collapsibleBlockHandlerTextTransform: string

  ctaFontSize: string
  ctaFontSizeDesktop: string
  ctaFontWeight: string
  ctaFontFamily: string
  ctaLineHeight: string
  ctaLineHeightDesktop: string
  ctaLetterSpacing: string
  ctaTextTransform: string

  fullFontSize: string
  fullFontSizeDesktop: string
  fullFontWeight: string
  fullFontFamily: string
  fullLineHeight: string
  fullLineHeightDesktop: string
  fullLetterSpacing: string
  fullTextTransform: string

  availabilityFontSize: string
  availabilityFontSizeDesktop: string
  availabilityFontWeight: string
  availabilityFontFamily: string
  availabilityLineHeight: string
  availabilityLineHeightDesktop: string
  availabilityLetterSpacing: string
  availabilityTextTransform: string

  blockFontSize: string
  blockFontSizeDesktop: string
  blockFontWeight: string
  blockFontFamily: string
  blockLineHeight: string
  blockLineHeightDesktop: string
  blockLetterSpacing: string
  blockTextTransform: string

  colophonFontSize: string
  colophonFontSizeDesktop: string
  colophonFontWeight: string
  colophonFontFamily: string
  colophonLineHeight: string
  colophonLineHeightDesktop: string
  colophonLetterSpacing: string
  colophonTextTransform: string

  sectionHeaderFontSize: string
  sectionHeaderFontSizeDesktop: string
  sectionHeaderFontWeight: string
  sectionHeaderFontFamily: string
  sectionHeaderLineHeight: string
  sectionHeaderLineHeightDesktop: string
  sectionHeaderLetterSpacing: string
  sectionHeaderTextTransform: string

  productCellSingleNameFontSize: string
  productCellSingleNameFontSizeDesktop: string
  productCellSingleNameFontWeight: string
  productCellSingleNameFontFamily: string
  productCellSingleNameLineHeight: string
  productCellSingleNameLineHeightDesktop: string
  productCellSingleNameLetterSpacing: string
  productCellSingleNameTextTransform: string

  productCellWideNameFontSize: string
  productCellWideNameFontSizeDesktop: string
  productCellWideNameFontWeight: string
  productCellWideNameFontFamily: string
  productCellWideNameLineHeight: string
  productCellWideNameLineHeightDesktop: string
  productCellWideNameLetterSpacing: string
  productCellWideNameTextTransform: string

  productCellSingleSubNameFontSize: string
  productCellSingleSubNameFontSizeDesktop: string
  productCellSingleSubNameFontWeight: string
  productCellSingleSubNameFontFamily: string
  productCellSingleSubNameLineHeight: string
  productCellSingleSubNameLineHeightDesktop: string
  productCellSingleSubNameLetterSpacing: string
  productCellSingleSubNameTextTransform: string
  
  productCellWideSubNameFontSize: string
  productCellWideSubNameFontSizeDesktop: string
  productCellWideSubNameFontWeight: string
  productCellWideSubNameFontFamily: string
  productCellWideSubNameLineHeight: string
  productCellWideSubNameLineHeightDesktop: string
  productCellWideSubNameLetterSpacing: string
  productCellWideSubNameTextTransform: string

  //--- price block ---
  priceTagDiscountedFontSize: string
  priceTagDiscountedFontSizeDesktop: string
  priceTagDiscountedFontWeight: string
  priceTagDiscountedFontFamily: string
  priceTagDiscountedLineHeight: string
  priceTagDiscountedLineHeightDesktop: string
  priceTagDiscountedLetterSpacing: string
  priceTagDiscountedTextTransform: string

  //--- discounted ---
  discountedFontSize: string
  discountedFontSizeDesktop: string
  discountedFontWeight: string
  discountedFontFamily: string
  discountedLineHeight: string
  discountedLineHeightDesktop: string
  discountedLetterSpacing: string
  discountedTextTransform: string

  //--- discounted currency ---
  discountedCurrencyFontSize: string
  discountedCurrencyFontSizeDesktop: string
  discountedCurrencyFontWeight: string
  discountedCurrencyFontFamily: string
  discountedCurrencyLineHeight: string
  discountedCurrencyLineHeightDesktop: string
  discountedCurrencyLetterSpacing: string
  discountedCurrencyTextTransform: string

  //--- discount ---
  discountFontSize: string
  discountFontSizeDesktop: string
  discountFontWeight: string
  discountFontFamily: string
  discountLineHeight: string
  discountLineHeightDesktop: string
  discountLetterSpacing: string
  discountTextTransform: string

  //--- price ---
  priceFontSize: string
  priceFontSizeDesktop: string
  priceFontWeight: string
  priceFontFamily: string
  priceLineHeight: string
  priceLineHeightDesktop: string
  priceLetterSpacing: string
  priceTextTransform: string

  //--- price currency ---
  priceCurrencyFontSize: string
  priceCurrencyFontSizeDesktop: string
  priceCurrencyFontWeight: string
  priceCurrencyFontFamily: string
  priceCurrencyLineHeight: string
  priceCurrencyLineHeightDesktop: string
  priceCurrencyLetterSpacing: string
  priceCurrencyTextTransform: string

  //--- unit type ---
  unitTypeFontSize: string
  unitTypeFontSizeDesktop: string
  unitTypeFontWeight: string
  unitTypeFontFamily: string
  unitTypeLineHeight: string
  unitTypeLineHeightDesktop: string
  unitTypeLetterSpacing: string
  unitTypeTextTransform: string
}

interface ITplProductInfo {
  iconPlusActive: boolean
  iconPlusWidth: string
  iconPlusHeight: string
  iconPlusLevel: number
  iconPlusImage: string
  iconPlusPositionX: string
  iconPlusPositionY: string
  iconPlusBlinkTimes: number
  iconPlusAnimationDuration: string
  iconPlusOpacity: string
  singleCellHeight: string
  wideCellHeight: string
  formatPrice: eFormatPrice
  bottomSheetSingleMode?: boolean
}

interface ITplSchema {
  _id: string
  retailerId: number
  name: string
  retailerInfo: ITplRetailerInfo
  productInfo?: ITplProductInfo
  priceInfo?: ITplPriceInfo
  fonts?: ITplFonts
  fontInfoCssVars: ITplFontInfoCssVars
  cssVars: ITplCssVars
  badges?: ITplBadge[]
  basePath: string
  templateComponents?: ITplComponents
  saved: boolean
}

export {
  ITplSchema,
  ITplRetailerInfo,
  ITplProductInfo,
  ITplPriceInfo,
  ITplFont,
  ITplFonts,
  ITplCssVars,
  ITplBadge,
  ITransformOrigin,
  ITplFontInfoCssVars,
}
