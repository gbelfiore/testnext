import { type ISchemaOpt } from '~/typings/schemaOpt'
import { type IMediaOpt, type IProductOpt, type ISectionOpt } from '~/typings/schemaopt'
import { type EventNames, type TrackerProviders } from '~/utilities/event-tracker/enums'
import { type GoogleAnalyticsKeys, type GoogleAnalytics } from '~/utilities/event-tracker/providers/google-analytics'
import { type ShopfullyKeys, type Shopfully } from '~/utilities/event-tracker/providers/shopfully'
import { type SVRetailerDataLayerKeys, type SVRetailerDataLayer } from '~/utilities/event-tracker/providers/sv-retailer-data-layer'
import type FacebookPixel from './providers/facebook/facebook'

type AllowedMethodsMap = Record<TrackerProviders, EventNames[]>

type ProviderMethods = GoogleAnalyticsKeys & ShopfullyKeys & SVRetailerDataLayerKeys

type IProviders = Record<TrackerProviders, GoogleAnalytics | Shopfully | FacebookPixel | SVRetailerDataLayer>

interface IProvider {
  allowedMethods: EventNames[]
  sendEvent: <T extends EventNames>(params: EventPayloads[T], eventName?: EventNames) => Promise<void>
}

interface EventsArgs {
  // HOW TO: invio a ricezione e renderizzazione dello schema
  [EventNames.FLYER_OPEN]: void
  // HOW TO: invio a ricezione e renderizzazione dello schema
  [EventNames.OFFER_OPEN]: {
    fid: number
    utm_campaign?: string
  }
  [EventNames.OFFER_VIEW]: {
    fid: number
    utm_campaign?: string
  }
  // HOW TO: invio ad ingresso del prodotto nel viewport
  [EventNames.PRODUCT_IMPRESSION]: {
    productIndex: number
    sectionIndex: number
  }
  [EventNames.MEDIA_PRODUCT_IMPRESSION]: {
    productIndex: number
    sectionIndex: number
  }
  // HOW TO: invio al click sul prodotto con conseguente apertura parziale del flyout
  [EventNames.FLYOUT_OPEN]: {
    productIndex: number
    sectionIndex: number
  }
  // HOW TO: invio al click sulle call to action presenti all'interno del price tag, nel flyout
  [EventNames.CTA_CLICK]: {
    productIndex: number
    sectionIndex: number
    position: number
    ctaUrl: string | undefined
    ctaLabel: string | undefined
  }
  // HOW TO: invio al trigger dell'evento beforeunload
  [EventNames.FLYER_CLOSE]: void
  // HOW TO: invio trigger su clickout media
  [EventNames.MEDIA_CLICK]: {
    sectionIndex: number
    productIndex: number
  }
  [EventNames.MEDIA_START_VIDEO]: {
    sectionIndex: number
    productIndex: number
    positionVideo: number
  }
  [EventNames.MEDIA_SECTION_START_VIDEO]: {
    section: ISectionOpt
    media: IMediaOpt
    positionVideo: number
    positionMedia: 'header' | 'footer'
  }

  [EventNames.MEDIA_VIEW_VIDEO]: {
    sectionIndex: number
    productIndex: number
    positionStartVideo: number
    isSeekVideo: boolean
    percentageVideo: number
  }
  [EventNames.MEDIA_SECTION_VIEW_VIDEO]: {
    section: ISectionOpt
    media: IMediaOpt
    positionStartVideo: number
    isSeekVideo: boolean
    percentageVideo: number
    positionMedia: 'header' | 'footer'
  }

  [EventNames.MEDIA_TOGGLE_VIDEO]: {
    sectionIndex: number
    productIndex: number
    positionVideo: number
  }
  [EventNames.MEDIA_SECTION_TOGGLE_VIDEO]: {
    section: ISectionOpt
    media: IMediaOpt
    positionVideo: number
    positionMedia: 'header' | 'footer'
  }
}

interface CommonEventsArgs {
  sf_sid: ''
  utm_source: string | 'direct'
  utm_medium: string | 'sl'
  gclid: string | ''
  fid: string | number
  utm_campaign: title
  a: 's2s'
  z: number
  c: string | 'it_IT'
  t: string | 'w' | 'm'
  dcid: string
  property_id?: string
}

interface EventPayloads {
  [EventNames.FLYER_OPEN]: {
    s2s_ea: 'vf'
    s2s_ec: 'i'
    s2s_el: string
    s2s_ev: number
  }
  [EventNames.OFFER_OPEN]: {
    a: 'ov'
    fvk: 'wo'
    fid: ISchemaOpt['id']
    utm_campaign?: ISchemaOpt['name']
  }
  [EventNames.OFFER_VIEW]: {
    a: 'ov'
    fvk: 'w'
    fid: ISchemaOpt['id']
    utm_campaign?: ISchemaOpt['name']
  }
  [EventNames.PRODUCT_IMPRESSION]: {
    s2s_ea: 'vpc'
    s2s_ec: 'i'
    s2s_el: string
    s2s_pos: number
    s2s_iid: IProductOpt['id']
    s2s_title: IProductOpt['name']
    s2s_pc: ISectionOpt['name']
  }
  [EventNames.MEDIA_PRODUCT_IMPRESSION]: {
    s2s_ea: 'vpc'
    s2s_ec: 'i'
    s2s_el: string
    s2s_pos: number
    s2s_iid: IProductOpt['id']
    s2s_title: IProductOpt['name']
    s2s_pc: ISectionOpt['name']
  }
  [EventNames.FLYOUT_OPEN]: {
    s2s_ea: 'od'
    s2s_ec: 'c'
    s2s_el: string
    s2s_pos: number
    s2s_iid: IProductOpt['id']
    s2s_title: IProductOpt['name']
    s2s_origin: 'landing'
    s2s_pc: ISectionOpt['name']
  }
  [EventNames.CTA_CLICK]: {
    s2s_ea: 'mi'
    s2s_ec: 'c'
    s2s_el: string
    s2s_pos: number
    s2s_iid: IProductOpt['id']
    s2s_title: IProductOpt['name']
    s2s_pc: ISectionOpt['name']
  }
  [EventNames.FLYER_CLOSE]: {
    s2s_ea: 'end'
    s2s_el: string
    s2s_ev: number
    s2s_ed?: number
  }
  [EventNames.MEDIA_CLICK]: {
    s2s_ea: 'mi'
    s2s_ec: 'c'
    s2s_pc: ISectionOpt['name']
    s2s_urlMedia: string
    s2s_urlCta: string
    s2s_type: string
  }
  [EventNames.MEDIA_START_VIDEO]: {
    s2s_ea: 'sv'
    s2s_ec: 'c'
    s2s_el: 'card'
    s2s_pos: number
    s2s_iid: string
    s2s_title: ISectionOpt['name']
    s2s_urlMedia: string
    s2s_type: string
  }
  [EventNames.MEDIA_SECTION_START_VIDEO]: {
    s2s_ea: 'sv'
    s2s_ec: 'c'
    s2s_el: 'card'
    s2s_pos: number
    s2s_iid: string
    s2s_title: ISectionOpt['name']
    s2s_urlMedia: string
    s2s_type: string
    s2s_positionMedia: 'header' | 'footer'
  }

  [EventNames.MEDIA_VIEW_VIDEO]: {
    s2s_ea: 'vv'
    s2s_ec: 'i'
    s2s_el: 'ff' | 'noff'
    s2s_ev: number
    s2s_pos: number
    s2s_iid: string
    s2s_title: ISectionOpt['name']
    s2s_urlMedia: string
    s2s_type: string
  }
  [EventNames.MEDIA_SECTION_VIEW_VIDEO]: {
    s2s_ea: 'vv'
    s2s_ec: 'i'
    s2s_el: 'ff' | 'noff'
    s2s_ev: number
    s2s_pos: number
    s2s_iid: string
    s2s_title: ISectionOpt['name']
    s2s_urlMedia: string
    s2s_type: string
    s2s_positionMedia: 'header' | 'footer'
  }

  [EventNames.MEDIA_TOGGLE_VIDEO]: {
    s2s_ea: 'tv'
    s2s_ec: 'c'
    s2s_el: 'full'
    s2s_pos: number
    s2s_iid: string
    s2s_title: ISectionOpt['name']
    s2s_urlMedia: string
    s2s_type: string
  }
  [EventNames.MEDIA_SECTION_TOGGLE_VIDEO]: {
    s2s_ea: 'tv'
    s2s_ec: 'c'
    s2s_el: 'full'
    s2s_pos: number
    s2s_iid: string
    s2s_title: ISectionOpt['name']
    s2s_urlMedia: string
    s2s_type: string
    s2s_positionMedia: 'header' | 'footer'
  }
}

interface TimeParameters {
  et: number
  st: string
  ts: string
  z: number
}

interface GeolocationParameters {
  lat: string
  lng: string
  lm: string
  la: string
}

export {
  AllowedMethodsMap,
  ProviderMethods,
  IProviders,
  EventsArgs,
  CommonEventsArgs,
  IProvider,
  EventPayloads,
  TimeParameters,
  GeolocationParameters,
}
