'use client'

import { HttpService } from '~/utilities/http-service'
import { EventNames } from '~/utilities/event-tracker/enums'
import { useSchemaStore } from '~/state/schema'
import { EventsArgs, IProvider, EventPayloads } from '~/utilities/event-tracker/typings'
import { ShopfullyTrackerInterceptors } from '~/utilities/event-tracker/providers/shopfully/enum'
import { AxiosRequestConfig } from 'axios'
import { CommonProvider } from '~/utilities/event-tracker/providers/common'
import http from 'http'
import https from 'https'
import { useQueryStringStore } from '~/state/queryString'
import { getConfigForCountry } from '~/config'

const config = getConfigForCountry()

class Shopfully implements IProvider {
  private static _instance: Shopfully
  private httpService: HttpService
  private _allowedMethods: EventNames[] = [
    EventNames.FLYER_OPEN,
    EventNames.OFFER_OPEN,
    EventNames.OFFER_VIEW,
    EventNames.FLYER_CLOSE,
    EventNames.CTA_CLICK,
    EventNames.FLYOUT_OPEN,
    EventNames.PRODUCT_IMPRESSION,
    EventNames.MEDIA_PRODUCT_IMPRESSION,
  ]

  private queryStringTrackUrl = useQueryStringStore.getState().params.trackUrl

  private isTiendeoEN =
    typeof window !== 'undefined' ? globalThis.location.hostname.includes('tiendeo') && useQueryStringStore.getState().params.from_en : false

  private endpoint?: string = this.queryStringTrackUrl ?? (this.isTiendeoEN ? config.TRACKING.ENDPOINT_TIENDEO_EN : config.TRACKING.ENDPOINT)

  constructor() {
    this.onFulfilledCommonParams = this.onFulfilledCommonParams.bind(this)

    this.httpService = new HttpService({
      requestConfig: {
        baseURL: this.endpoint,
        withCredentials: false,
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),
      },
      interceptors: {
        request: [
          {
            name: ShopfullyTrackerInterceptors.SET_COMMON_PARAMS,
            onFulfilled: this.onFulfilledCommonParams,
            onRejected: (error) => Promise.reject(error),
          },
        ],
        response: [],
      },
    })
  }

  private async onFulfilledCommonParams(axiosRequestConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    let propertyId = null
    let nextEnToken = null

    if (this.isTiendeoEN) {
      propertyId = config.TIENDEO_EN_PROPERTY_ID
      nextEnToken = config.TRACKING.TOKEN_TIENDEO_EN
    }
    const commonParams = (await CommonProvider.getCommonParams(propertyId)) ?? {}
    const timeParams = CommonProvider.getTimeParameters(nextEnToken) ?? {}
    const geolocationParams = CommonProvider.getGeolocationParams() ?? {}
    axiosRequestConfig = {
      ...axiosRequestConfig,
      params: {
        ...commonParams,
        ...timeParams,
        ...geolocationParams,
        ...(axiosRequestConfig.params ?? {}),
      },
    }
    return axiosRequestConfig
  }

  public static get instance(): Shopfully {
    if (!this._instance) this._instance = new Shopfully()
    return this._instance
  }

  public get allowedMethods(): EventNames[] {
    return this._allowedMethods
  }

  public async sendEvent<T extends EventNames>(params: EventPayloads[T]): Promise<void> {
    try {
      await this.httpService.http?.get(this.endpoint ?? '', {
        params,
      })
    } catch {
      //
    }
  }

  public async [EventNames.FLYER_OPEN](): Promise<void> {
    const state = useSchemaStore.getState()
    const retailerId = state.schema?.retailerId
    const name = state.schema?.name

    if (retailerId) {
      const payload: EventPayloads[EventNames.FLYER_OPEN] = {
        s2s_ea: 'vf',
        s2s_ec: 'i',
        s2s_el: name ?? '',
        s2s_ev: retailerId,
      }
      void this.sendEvent<EventNames.FLYER_OPEN>(payload)
    }
  }

  public async [EventNames.PRODUCT_IMPRESSION](data: EventsArgs[EventNames.PRODUCT_IMPRESSION]): Promise<void> {
    if (data.productIndex > -1) {
      const state = useSchemaStore.getState()
      const section = state.schema?.sections?.find((_, i) => i === data.sectionIndex)
      if (section) {
        const product = section.products?.find((_, i) => i === data.productIndex)
        if (product) {
          const payload: EventPayloads[EventNames.PRODUCT_IMPRESSION] = {
            s2s_ea: 'vpc',
            s2s_ec: 'i',
            s2s_el: `${product.position}-${product.id}-${product.name}`,
            s2s_pos: product.position,
            s2s_iid: product.id,
            s2s_title: product.name,
            s2s_pc: section.name,
          }
          void this.sendEvent<EventNames.PRODUCT_IMPRESSION>(payload)
        }
      }
    }
  }

  public async [EventNames.MEDIA_PRODUCT_IMPRESSION](data: EventsArgs[EventNames.MEDIA_PRODUCT_IMPRESSION]): Promise<void> {
    if (data.productIndex > -1) {
      const state = useSchemaStore.getState()
      const section = state.schema?.sections?.find((_, i) => i === data.sectionIndex)
      if (section) {
        const mediaProduct = section.products?.find((_, i) => i === data.productIndex)
        if (mediaProduct) {
          const payload: EventPayloads[EventNames.MEDIA_PRODUCT_IMPRESSION] = {
            s2s_ea: 'vpc',
            s2s_ec: 'i',
            s2s_el: `${mediaProduct.position}-xxx-${mediaProduct.name}`,
            s2s_pos: mediaProduct.position,
            s2s_iid: mediaProduct.id,
            s2s_title: mediaProduct.name,
            s2s_pc: section.name,
          }
          void this.sendEvent<EventNames.MEDIA_PRODUCT_IMPRESSION>(payload)
        }
      }
    }
  }

  public async [EventNames.FLYOUT_OPEN](data: EventsArgs[EventNames.FLYOUT_OPEN]): Promise<void> {
    if (data.productIndex > -1) {
      const state = useSchemaStore.getState()
      const section = state.schema?.sections?.find((_, i) => i === data.sectionIndex)
      if (section) {
        const product = section.products?.find((_, i) => i === data.productIndex)
        if (product) {
          const payload: EventPayloads[EventNames.FLYOUT_OPEN] = {
            s2s_ea: 'od',
            s2s_ec: 'c',
            s2s_el: `${data.productIndex}-${product.id}-${product.name}`,
            s2s_pos: product.position,
            s2s_iid: product.id,
            s2s_title: product.name,
            s2s_origin: 'landing',
            s2s_pc: section.name,
          }
          void this.sendEvent<EventNames.FLYOUT_OPEN>(payload)
        }
      }
    }
  }

  public async [EventNames.OFFER_OPEN](data: EventsArgs[EventNames.OFFER_OPEN]): Promise<void> {
    const payload: EventPayloads[EventNames.OFFER_OPEN] = {
      a: 'ov',
      fvk: 'wo',
      fid: data.fid,
      utm_campaign: data.utm_campaign,
    }
    void this.sendEvent<EventNames.OFFER_OPEN>(payload)
  }

  public async [EventNames.OFFER_VIEW](data: EventsArgs[EventNames.OFFER_VIEW]): Promise<void> {
    const payload: EventPayloads[EventNames.OFFER_VIEW] = {
      a: 'ov',
      fvk: 'w',
      fid: data.fid,
      utm_campaign: data.utm_campaign,
    }
    void this.sendEvent<EventNames.OFFER_VIEW>(payload)
  }

  public async [EventNames.CTA_CLICK](data: EventsArgs[EventNames.CTA_CLICK]): Promise<void> {
    if (data.productIndex > -1) {
      const state = useSchemaStore.getState()
      const section = state.schema?.sections?.find((_, i) => i === data.sectionIndex)
      if (section) {
        const product = section.products?.find((_, i) => i === data.productIndex)
        if (product) {
          const payload: EventPayloads[EventNames.CTA_CLICK] = {
            s2s_ea: 'mi',
            s2s_ec: 'c',
            s2s_pos: data.position,
            s2s_iid: product.id,
            s2s_title: product.name,
            s2s_pc: section.name,
            s2s_el: `${data.productIndex}-${product.id}-${product.name}`,
          }
          void this.sendEvent<EventNames.CTA_CLICK>(payload)
        }
      }
    }
  }

  public async [EventNames.FLYER_CLOSE](): Promise<void> {
    const state = useSchemaStore.getState()
    const retailerId = state.schema?.retailerId
    const name = state.schema?.name

    if (retailerId) {
      const payload: EventPayloads[EventNames.FLYER_CLOSE] = {
        s2s_ea: 'end',
        s2s_el: name ?? '',
        s2s_ev: retailerId,
      }
      void this.sendEvent<EventNames.FLYER_CLOSE>(payload)
    }
  }
}

export type ShopfullyKeys = keyof Shopfully
export { Shopfully }
