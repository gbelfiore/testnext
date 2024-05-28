import { type IPriceTagColors, type ITransformOrigin, type IBundleColors } from '~/typings/common'
import { type ITplSchema, type ITplBadge } from '~/typings/template'
import type eFormatPrice from '~/typings/eFormatPrice'
import { type TTplComponents, type ITplComponents } from '~/typings/templateComponents'
import { IProductOpt } from './schemaopt'
import { eProductCellSubModifier, eProductWideSubModifier } from '~/typings/eModifier'


type TProductImage = string
type TMedia = 'image' | 'externalImage' | 'video' | 'externalVideo' | 'gif' | 'externalGif' | 'multiImages'

interface IMediaCta {
  ctaUrl?: string
  ctaIcon?: string
  ctaIconWidth?: string
  ctaIconHeight?: string
  ctaIconTranslateX?: string
  ctaIconTranslateY?: string
  ctaIconTransformOrigin?: ITransformOrigin
}

interface IMediaGeneralVideo {
  autoPlay?: boolean
  controls?: boolean
  muted?: boolean
  loop?: boolean
}
interface IMediaData {
  externalGif: IMediaCta & {
    url: string
  }
  gif: IMediaCta & {
    src: string
  }
  externalVideo: IMediaGeneralVideo &
  IMediaCta & {
    url: string
  }
  video: IMediaGeneralVideo &
  IMediaCta & {
    src: string
  }
  externalImage: IMediaCta & {
    url: string
  }
  image: IMediaCta & {
    src: string
  }
  multiImages: IMediaCta & {
    title?: string
    icon?: string
    headerBackgroundColor?: string
    bodyBackgroundColor?: string
    textColor?: string
    // height?: string
    src: Array<string>
  }
}

interface IMedia<T extends keyof IMediaData> {
  type: T
  props: IMediaData[T]
}

interface IMediaProduct<T extends keyof IMediaData> extends IMedia<T> {
  name: string
  props: { modifier?: 'wide' } & IMediaData[T]
}

interface IStore {
  id?: number
  address: string
  isOpen: boolean
  hasArrow?: boolean
  lat: number
  lon: number
  openingHours: IOpeningHour[] | null
  city: string
  phone: string
}

interface IOpeningHour {
  id?: number
  open: string
  close: number
  day: number
}

interface IProductPrice extends IPriceTagColors {
  full?: string
  discount?: string
  discounted?: string
  priceDecimalSeparator?: string
  discountDecimalSeparator?: string
  priceTagWidth?: number
  priceTagHeight?: number
  priceTagZoom?: number
  priceTagZoomFlyout?: number
  formatPrice?: eFormatPrice
  textCustom1?: string
  textCustom2?: string
}

interface ICtaAction {
  type: 'external' | 'share' | 'extend' | 'shoppinglist'
  url?: string
  text?: string
  title?: string
}

interface ICta {
  label: string
  icon: string
  color?: string
  action?: ICtaAction
  alternate?: boolean
  validity?: {
    web: boolean
    mobile: boolean
  }
}

interface IHighlight {
  text: string
  isLabel?: boolean
}

interface IShopfullyProductDetail {
  key: string
  value: string
}

interface ICollapsibleSectionContentData {
  sfProduct: {
    data: {
      description: string
    }
    key?: string
  }
  sfProductDetails: {
    data: {
      details: IShopfullyProductDetail[]
    }
    key?: string
  }
  html: {
    data: string
    key?: string
  }
  img: {
    data: {
      src: string
      maxWidth: number
      alt: string
    }
    key?: string
  }
  video: {
    data: {
      src: string
    }
    key?: string
  }
  buy: {
    key?: string
  }
  location: {
    key?: string
  }
  openings: {
    key?: string
  }
  phone: {
    key?: string
  }
}

interface ICollapsibleSectionContent<T extends keyof ICollapsibleSectionContentData> {
  type: keyof ICollapsibleSectionContentData
  props: Record<string, any> & ICollapsibleSectionContentData[T]
}

interface ICollapsibleSection {
  title: string
  contents: ICollapsibleSectionContent[]
  isDefaultOpen?: boolean
}

interface IPairedProduct {
  id: string | number
  heading: string
  description: string
  productImage: TProductImage
  backgroundColor?: string
  textColor?: string
}

interface ISpec {
  src: string
  size: 'small' | 'large'
}

interface IBundleInfo extends IBundleColors {
  priceOriginalText?: string
  otherInfo?: string
  columnsNumber?: number
}

interface IProduct {
  id: string
  brandText?: string
  brandImage?: string
  brandImageWidth?: string
  brandImageHeight?: string
  brandImageMargin?: string
  description?: string
  modifier: eProductModifier
  subModifier: eProductCellSubModifier | eProductWideSubModifier
  bundleType?: 'pure' | 'mixed'
  bundleProducts?: IProduct[]
  bundleInfo?: IBundleInfo
  name: string
  subName: string
  variantPreviewTitle: string
  unitType: string
  price: IProductPrice
  backgroundImage?: string
  productImage: TProductImage
  productMultiImages?: TProductImageOpt[]
  specs?: ISpec[]
  available?: boolean
  highlights?: IHighlight[][][]
  collapsibleSections?: ICollapsibleSection[]
  pairedProduct: IPairedProduct
  backgroundColor?: string
  textColor?: string
  subTextColor?: string
  flyoutTextColor?: string
  flyoutSubTextColor?: string
  ctas?: ICta[]
  selectedBadge?: ITplBadge['name']
  position: number
  categoryId?: number
  categoryName?: string
  categorySlug?: string
  hideBottomLine?: boolean
  templateComponents?: ITplComponents
  children?: Array<IProductOpt>
}

interface ISection {
  id: string
  name: string
  headingBackgroundColor?: string
  headingTextColor?: string
  footer?: IMedia<TMedia>
  header?: IMedia<TMedia>
  backgroundPattern?: string
  modifier?: 'slider'
  products: Array<IProduct | IMediaProduct>[]
  template?: ITplSchema['_id']
  templateComponents?: ITplComponents
}

interface IOpening {
  closed: boolean
  schedules: {
    opening: string
    closing: string
  }
}

interface IRetailer {
  name: string
  address: string
  street: string
  civic: string
  postalCode: string
  city: string
  phoneNumber: string
  openings: IOpening[]
  ctas?: ICta[]
}

interface ISchema {
  name?: string
  dateFrom?: string
  dateTo?: string
  backcoverImage: string
  colophon: string
  coverImage: string
  sections: ISection[]
  retailer: IRetailer
  frequentSearches: string[]
  stores?: IStore[]
  id: number
  retailerId: number
  flyerId: number
  redirectUrl?: string
  basePath: string
  template: ITplSchema['_id']
  templates: ITplSchema[]
  templatesComponents: TTplComponents[]
  columnsCount?: number
  allowOrphanProducts?: boolean
  version?: number
}

export {
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
  IMedia,
  IMediaProduct,
  TMedia,
}
