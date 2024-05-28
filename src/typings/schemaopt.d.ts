import {
  TProductImage,
  IProductPrice,
  IProduct,
  ISection,
  ISchema,
  IRetailer,
  IStore,
  ICollapsibleSection,
  ICollapsibleSectionContent,
  IOpening,
  IHighlight,
  ICta,
  IPairedProduct,
  ICtaAction,
  ICollapsibleSectionContentData,
  ISpec,
  IMediaData,
} from '~/typings/schema'
import { IPriceTagColors } from '~/typings/common'

type TProductImageOpt = TProductImage | undefined

interface IMediaOpt<T extends keyof IMediaData<T>> {
  name?: IMedia['name']
  type?: IMedia['type']
  props?: IMedia['props']
}

interface IMediaProductOpt<T extends keyof IMediaData> extends IMediaOpt<T> {
  tracking: boolean
  props?: { modifier?: 'wide' } & IMediaData[T]
}

interface IStoreComputedFields {
  distance?: number
}

interface IOpeningHourOpt extends IOpeningHour {
  open?: IOpeningHour['open']
  close?: IOpeningHour['close']
  day?: IOpeningHour['day']
}

interface IStoreOpt extends IStore, IStoreComputedFields {
  id?: IStore['id']
  address?: IStore['address']
  isOpen?: IStore['isOpen']
  hasArrow?: IStore['hasArrow']
  lat?: IStore['lat']
  lon?: IStore['lon']
  openingHours?: IOpeningHourOpt[]
  city?: IStore['city']
  phone?: IStore['phone']
}

interface IProductPriceOpt extends IProductPrice, IPriceTagColorsOpt {
  full?: IProductPrice['full']
  discount?: IProductPrice['discount']
  discounted?: IProductPrice['discountDecimalSeparator']
  priceDecimalSeparator?: IProductPrice['priceDecimalSeparator']
  discountDecimalSeparator?: IProductPrice['discountDecimalSeparator']
  priceTagWidth?: IProductPrice['priceTagWidth']
  priceTagHeight?: IProductPrice['priceTagHeight']
  priceTagZoom?: IProductPrice['priceTagZoom']
  priceTagZoomFlyout?: IProductPrice['priceTagZoomFlyout']
  formatPrice?: IProductPrice['formatPrice']
  textCustom1?: IProductPrice['textCustom1']
  textCustom2?: IProductPrice['textCustom2']
}

interface ICtaActionOpt extends ICtaAction {
  type?: ICtaAction['type']
  url?: ICtaAction['url']
  text?: ICtaAction['text']
  title?: ICtaAction['title']
}

interface ICtaOpt extends ICta {
  label?: ICta['label']
  icon?: ICta['icon']
  color?: ICta['color']
  action?: ICtaActionOpt
  alternate?: ICtap['alternate']
  validity?: ICtap['validity']
}

interface IHighlightOpt extends IHighlight {
  text?: IHighlight['text']
  isLabel?: IHighlight['isLabel']
}

interface IShopfullyProductDetailOpt extends IShopfullyProductDetail {
  key?: IShopfullyProductDetail['key']
  value?: IShopfullyProductDetail['value']
}

interface ICollapsibleSectionContentDataOpt extends ICollapsibleSectionContentData {
  sfProduct?: {
    data?: {
      description?: ICollapsibleSectionContentData['sfProduct']['data']['description']
    }
    key?: ICollapsibleSectionContentData['sfProduct']['key']
  }
  sfProductDetails?: {
    data?: {
      details?: IShopfullyProductDetailOpt[]
    }
    key?: ICollapsibleSectionContentData['sfProductDetails']['key']
  }
  html?: {
    data?: ICollapsibleSectionContentData['html']['data']
    key?: ICollapsibleSectionContentData['html']['key']
  }
  img?: {
    data?: {
      src?: ICollapsibleSectionContentData['img']['data']['src']
      maxWidth?: ICollapsibleSectionContentData['img']['data']['maxWidth']
      alt?: ICollapsibleSectionContentData['img']['data']['alt']
    }
    key?: ICollapsibleSectionContentData['img']['key']
  }
  video?: {
    data?: {
      src?: ICollapsibleSectionContentData['video']['data']['src']
    }
    key?: ICollapsibleSectionContentData['video']['key']
  }
  buy?: {
    key?: ICollapsibleSectionContentData['buy']['key']
  }
  location?: {
    key?: ICollapsibleSectionContentData['location']['key']
  }
  openings?: {
    key?: ICollapsibleSectionContentData['openings']['key']
  }
  phone?: {
    key?: ICollapsibleSectionContentData['phone']['key']
  }
}

interface ICollapsibleSectionContentOpt<T extends keyof ICollapsibleSectionContentDataOpt>
  extends ICollapsibleSectionContent {
  type?: ICollapsibleSectionContent['type']
  props?: ICollapsibleSectionContent['props'] & ICollapsibleSectionContentDataOpt<T>
}

interface ICollapsibleSectionOpt extends ICollapsibleSection {
  title?: ICollapsibleSection['title']
  contents?: ICollapsibleSectionContentOpt[]
  isDefaultOpen?: boolean
}

interface IPairedProductOpt extends IPairedProduct {
  id?: IPairedProduct['id']
  heading?: IPairedProduct['heading']
  description?: IPairedProduct['description']
  productImage?: TProductImageOpt
  backgroundColor?: IPairedProduct['backgroundColor']
  textColor?: IPairedProduct['textColor']
}

interface ISpecOpt extends ISpec {
  src?: ISpec['src']
  size?: ISpec['size']
}

interface IProductOpt extends IProduct {
  id?: IProduct['id']
  brandText?: IProduct['brandText']
  brandImage?: IProduct['brandImage']
  brandImageWidth?: IProduct['brandImageWidth']
  brandImageHeight?: IProduct['brandImageHeight']
  brandImageMargin?: IProduct['brandImageMargin']
  description?: IProduct['description']
  modifier?: IProduct['modifier']
  name?: IProduct['name']
  subName?: IProduct['subName']
  variantPreviewTitle?: IProduct['variantPreviewTitle']
  unitType?: IProduct['unitType']
  price?: IProductPriceOpt
  backgroundImage?: IProduct['backgroundImage']
  productImage?: TProductImageOpt
  productMultiImages?: TProductImageOpt[]
  specs?: ISpecOpt[]
  available?: IProduct['available']
  highlights?: IHighlightOpt[][][]
  collapsibleSections?: ICollapsibleSectionOpt[]
  pairedProduct?: IPairedProductOpt
  backgroundColor?: IProduct['backgroundColor']
  textColor?: IProduct['textColor']
  subTextColor?: IProduct['subTextColor']
  flyoutTextColor?: IProduct['flyoutTextColor']
  flyoutSubTextColor?: IProduct['flyoutSubTextColor']
  ctas?: ICtaOpt[]
  selectedBadge?: IProduct['selectedBadge']
  hideBottomLine?: IProduct['hideBottomLine']
  templateComponents?: IProduct['templateComponents']
  highlightedDiscount?: IProductPrice['highlightedDiscount']
}

interface ISectionOpt extends ISection {
  id?: ISection['id']
  name?: ISection['name']
  headingBackgroundColor?: ISection['headingBackgroundColor']
  headingTextColor?: ISection['headingTextColor']
  footer?: ISection['footer']
  header?: ISection['header']
  backgroundPattern?: ISection['backgroundPattern']
  modifier?: ISection['modifier']
  products?: (IProductOpt | IMediaProductOpt)[]
  template?: ISchema['template']
  templateComponents?: ISchema['templateComponents']
}

interface IPriceTagColorsOpt extends IPriceTagColors {
  discountedPriceColor?: IPriceTagColors['discountedPriceColor']
  discountedPriceStrokeWidth?: IPriceTagColors['discountedPriceStrokeWidth']
  discountedPriceStrokeColor?: IPriceTagColors['discountedPriceStrokeColor']
  discountedPriceShadowColor?: IPriceTagColors['discountedPriceShadowColor']
  priceTagTopBorderColor?: IPriceTagColors['priceTagTopBorderColor']
  priceTagTopTextColor?: IPriceTagColors['priceTagTopTextColor']
  priceTagTopBackgroundColor?: IPriceTagColors['priceTagTopBackgroundColor']
  discountPriceTextColor?: IPriceTagColors['discountPriceTextColor']
  discountPriceBackgroundColor?: IPriceTagColors['discountPriceBackgroundColor']
  priceTagBackgroundColor?: IPriceTagColors['priceTagBackgroundColor']
  priceTagTextColor?: IPriceTagColors['priceTagTextColor']
  priceTagBorderColor?: IPriceTagColors['priceTagBorderColor']
  unitTypeTextColor?: IPriceTagColors['unitTypeTextColor']
  unitTypeBackgroundColor?: IPriceTagColors['unitTypeBackgroundColor']
  discountedCurrencyTextColor?: IPriceTagColors['discountedCurrencyTextColor']
  discountedCurrencyBackgroundColor?: IPriceTagColors['discountedCurrencyBackgroundColor']
  priceCurrencyTextColor?: IPriceTagColors['priceCurrencyTextColor']
  priceCurrencyBackgroundColor?: IPriceTagColors['priceCurrencyBackgroundColor']
}

interface IOpeningOpt extends IOpening {
  closed?: IOpening['closed']
  schedules?: {
    opening?: IOpening['schedules']['opening']
    closing?: IOpening['schedules']['closing']
  }
}

interface IRetailerOpt extends IRetailer {
  name?: IRetailer['name']
  address?: IRetailer['address']
  street?: IRetailer['street']
  civic?: IRetailer['civic']
  postalCode?: IRetailer['postalCode']
  city?: IRetailer['city']
  phoneNumber?: IRetailer['phoneNumber']
  openings?: IOpeningOpt[]
  ctas?: ICtaOpt[]
}

interface ISchemaOpt extends ISchema {
  name?: ISchema['name']
  dateFrom?: ISchema['dateFrom']
  dateTo?: ISchema['dateTo']
  backcoverImage?: ISchema['backcoverImage']
  colophon?: ISchema['colophon']
  coverImage?: ISchema['coverImage']
  sections?: ISectionOpt[]
  retailer?: IRetailerOpt
  frequentSearches?: ISchema['frequentSearches']
  stores?: IStoreOpt[]
  nearestStore?: IStoreOpt
  id?: ISchema['id']
  retailerId: ISchema['retailerId']
  redirectUrl?: ISchema['redirectUrl']
  basePath?: ISchema['basePath']
  template?: ISchema['template']
  templates?: ISchema['templates']
  templatesComponents?: ISchema['templatesComponents']
}

export {
  TProductImageOpt,
  IProductPriceOpt,
  IProductOpt,
  ISectionOpt,
  ISchemaOpt,
  IRetailerOpt,
  IStoreOpt,
  IOpeningHourOpt,
  ICollapsibleSectionOpt,
  ICollapsibleSectionContentOpt,
  IOpeningOpt,
  IHighlightOpt,
  ICtaOpt,
  IPairedProductOpt,
  ICtaActionOpt,
  ICollapsibleSectionContentDataOpt,
  ISpecOpt,
  IPriceTagColorsOpt,
  IMediaOpt,
  IMediaProductOpt,
}
