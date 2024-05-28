import { useSchemaStore } from '~/state/schema'
import { EventNames } from '~/utilities/event-tracker/enums'
import { EventsArgs, IProvider } from '~/utilities/event-tracker/typings'
import { EventPayloads } from '~/utilities/event-tracker/typings'
import { CommonProvider } from '~/utilities/event-tracker/providers/common'
import { BrowserService } from '../../../browser-service'

class GoogleAnalytics implements IProvider {
  private static _instance: GoogleAnalytics
  private _allowedMethods: EventNames[] = [
    EventNames.FLYER_OPEN,
    EventNames.FLYER_CLOSE,
    EventNames.CTA_CLICK,
    EventNames.FLYOUT_OPEN,
    EventNames.PRODUCT_IMPRESSION,
    EventNames.MEDIA_PRODUCT_IMPRESSION,
    EventNames.MEDIA_CLICK,
    EventNames.MEDIA_START_VIDEO,
    EventNames.MEDIA_SECTION_START_VIDEO,
    EventNames.MEDIA_VIEW_VIDEO,
    EventNames.MEDIA_SECTION_VIEW_VIDEO,
    EventNames.MEDIA_TOGGLE_VIDEO,
    EventNames.MEDIA_SECTION_TOGGLE_VIDEO,
  ]
  private trackingIds: string[] = ['G-D1C2F4RBZ1']
  private readingStart: number = 0
  private readingEnd: number = 0

  public static get instance(): GoogleAnalytics {
    if (!this._instance) this._instance = new GoogleAnalytics()
    return this._instance
  }

  public get allowedMethods(): EventNames[] {
    return this._allowedMethods
  }

  constructor() {
    this.appendTagManagerScripts()
  }

  private appendTagManagerScripts() {
    this.trackingIds.forEach((trackingId) => {
      if (!BrowserService.isServer()) {
        // browser code
        const mainScript = document.createElement('script')
        mainScript.async = true
        mainScript.type = 'text/javascript'
        mainScript.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`

        document.head.appendChild(mainScript)

        const tagScript = document.createElement('script')
        tagScript.async = true
        tagScript.type = 'text/javascript'
        const children = document.createTextNode(
          `globalThis.dataLayer=globalThis.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${trackingId}',{ 'debug_mode':true });`
        )
        tagScript.appendChild(children)

        document.head.appendChild(tagScript)
      }
    })
  }

  public async sendEvent<T extends EventNames>(params: EventPayloads[T], eventName?: EventNames): Promise<void> {
    const commonParams = (await CommonProvider.getCommonParams()) ?? {}
    const timeParams = CommonProvider.getTimeParameters() ?? {}
    const geolocationParams = CommonProvider.getGeolocationParams() ?? {}
    if ((globalThis as any).gtag) {
      ;(globalThis as any).gtag('event', eventName ?? 'GenericEvent', {
        ...commonParams,
        ...timeParams,
        ...geolocationParams,
        ...params,
      })
    }
  }


  public async [EventNames.FLYER_OPEN](): Promise<void> {
    const state = useSchemaStore.getState()
    const retailerId = state.schema?.retailerId
    const name = state.schema?.name

    if (retailerId) {
      this.readingStart = Date.now() / 1000
      const payload: EventPayloads[EventNames.FLYER_OPEN] = {
        s2s_ea: 'vf',
        s2s_ec: 'i',
        s2s_el: name ?? '',
        s2s_ev: retailerId,
      }
      void this.sendEvent<EventNames.FLYER_OPEN>(payload, EventNames.FLYER_OPEN)
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
          void this.sendEvent<EventNames.PRODUCT_IMPRESSION>(payload, EventNames.PRODUCT_IMPRESSION)
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
          void this.sendEvent<EventNames.MEDIA_PRODUCT_IMPRESSION>(payload, EventNames.MEDIA_PRODUCT_IMPRESSION)
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
          void this.sendEvent<EventNames.FLYOUT_OPEN>(payload, EventNames.FLYOUT_OPEN)
        }
      }
    }
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
          void this.sendEvent<EventNames.CTA_CLICK>(payload, EventNames.CTA_CLICK)
        }
      }
    }
  }

  public async [EventNames.FLYER_CLOSE](): Promise<void> {
    const state = useSchemaStore.getState()
    const retailerId = state.schema?.retailerId
    const name = state.schema?.name

    if (retailerId) {
      this.readingEnd = Date.now() / 1000

      const readingDuration = this.readingEnd - this.readingStart

      const payload: EventPayloads[EventNames.FLYER_CLOSE] = {
        s2s_ea: 'end',
        s2s_el: name ?? '',
        s2s_ev: retailerId,
        s2s_ed: readingDuration,
      }
      void this.sendEvent<EventNames.FLYER_CLOSE>(payload, EventNames.FLYER_CLOSE)
    }
  }

  public async [EventNames.MEDIA_CLICK](data: EventsArgs[EventNames.MEDIA_CLICK]): Promise<void> {
    if (data.sectionIndex > -1 && data.productIndex > -1) {
      const state = useSchemaStore.getState()
      const section = state.schema?.sections?.[data.sectionIndex]
      if (section) {
        const media = section.products?.[data.productIndex]
        if (media) {
          const payload: EventPayloads[EventNames.MEDIA_CLICK] = {
            s2s_ea: 'mi',
            s2s_ec: 'c',
            s2s_pc: section.name,
            s2s_urlMedia: media.props.src,
            s2s_urlCta: media.props.ctaUrl,
            s2s_type: media.type,
          }
          void this.sendEvent<EventNames.MEDIA_CLICK>(payload, EventNames.MEDIA_CLICK)
        }
      }
    }
  }

  public async [EventNames.MEDIA_START_VIDEO](data: EventsArgs[EventNames.MEDIA_START_VIDEO]): Promise<void> {
    if (data.sectionIndex > -1 && data.productIndex > -1 && data.positionVideo >= 0) {
      const state = useSchemaStore.getState()
      const section = state.schema?.sections?.[data.sectionIndex]
      if (section) {
        const media = section.products?.[data.productIndex]
        if (media) {
          const payload: EventPayloads[EventNames.MEDIA_START_VIDEO] = {
            s2s_ea: 'sv',
            s2s_ec: 'c',
            s2s_el: 'card',
            s2s_pos: data.positionVideo,
            s2s_iid: '',
            s2s_title: section.name,
            s2s_urlMedia: media.props.src,
            s2s_type: media.type,
          }
          void this.sendEvent<EventNames.MEDIA_START_VIDEO>(payload, EventNames.MEDIA_START_VIDEO)
        }
      }
    }
  }

  public async [EventNames.MEDIA_SECTION_START_VIDEO](data: EventsArgs[EventNames.MEDIA_SECTION_START_VIDEO]): Promise<void> {
    const { section, media, positionVideo, positionMedia } = data
    if (section && media && positionVideo >= 0) {
      const payload: EventPayloads[EventNames.MEDIA_SECTION_START_VIDEO] = {
        s2s_ea: 'sv',
        s2s_ec: 'c',
        s2s_el: 'card',
        s2s_pos: positionVideo,
        s2s_iid: '',
        s2s_title: section.name,
        s2s_urlMedia: media.props.src,
        s2s_type: media.type,
        s2s_positionMedia: positionMedia,
      }
      void this.sendEvent<EventNames.MEDIA_SECTION_START_VIDEO>(payload, EventNames.MEDIA_SECTION_START_VIDEO)
    }
  }

  public async [EventNames.MEDIA_VIEW_VIDEO](data: EventsArgs[EventNames.MEDIA_VIEW_VIDEO]): Promise<void> {
    const { sectionIndex, productIndex, positionStartVideo, isSeekVideo, percentageVideo } = data
    if (sectionIndex > -1 && productIndex > -1 && positionStartVideo >= 0) {
      const state = useSchemaStore.getState()
      const section = state.schema?.sections?.[data.sectionIndex]
      if (section) {
        const media = section.products?.[data.productIndex]
        if (media) {
          const payload: EventPayloads[EventNames.MEDIA_VIEW_VIDEO] = {
            s2s_ea: 'vv',
            s2s_ec: 'i',
            s2s_el: isSeekVideo ? 'ff' : 'noff',
            s2s_ev: percentageVideo,
            s2s_pos: positionStartVideo,
            s2s_iid: '',
            s2s_title: section.name,
            s2s_urlMedia: media.props.src,
            s2s_type: media.type,
          }
          void this.sendEvent<EventNames.MEDIA_VIEW_VIDEO>(payload, EventNames.MEDIA_VIEW_VIDEO)
        }
      }
    }
  }

  public async [EventNames.MEDIA_SECTION_VIEW_VIDEO](data: EventsArgs[EventNames.MEDIA_SECTION_VIEW_VIDEO]): Promise<void> {
    const { section, media, positionStartVideo, positionMedia, isSeekVideo, percentageVideo } = data
    if (section && media && positionStartVideo >= 0) {
      const payload: EventPayloads[EventNames.MEDIA_SECTION_VIEW_VIDEO] = {
        s2s_ea: 'vv',
        s2s_ec: 'i',
        s2s_el: isSeekVideo ? 'ff' : 'noff',
        s2s_ev: percentageVideo,
        s2s_pos: positionStartVideo,
        s2s_iid: '',
        s2s_title: section.name,
        s2s_urlMedia: media.props.src,
        s2s_type: media.type,
        s2s_positionMedia: positionMedia,
      }
      void this.sendEvent<EventNames.MEDIA_SECTION_VIEW_VIDEO>(payload, EventNames.MEDIA_SECTION_VIEW_VIDEO)
    }
  }

  public async [EventNames.MEDIA_TOGGLE_VIDEO](data: EventsArgs[EventNames.MEDIA_TOGGLE_VIDEO]): Promise<void> {
    const { sectionIndex, productIndex, positionVideo } = data
    if (sectionIndex > -1 && productIndex > -1 && positionVideo >= 0) {
      const state = useSchemaStore.getState()
      const section = state.schema?.sections?.[data.sectionIndex]
      if (section) {
        const media = section.products?.[data.productIndex]
        if (media) {
          const payload: EventPayloads[EventNames.MEDIA_TOGGLE_VIDEO] = {
            s2s_ea: 'tv',
            s2s_ec: 'c',
            s2s_el: 'full',
            s2s_pos: positionVideo,
            s2s_iid: '',
            s2s_title: section.name,
            s2s_urlMedia: media.props.src,
            s2s_type: media.type,
          }
          void this.sendEvent<EventNames.MEDIA_TOGGLE_VIDEO>(payload, EventNames.MEDIA_TOGGLE_VIDEO)
        }
      }
    }
  }

  public async [EventNames.MEDIA_SECTION_TOGGLE_VIDEO](data: EventsArgs[EventNames.MEDIA_SECTION_TOGGLE_VIDEO]): Promise<void> {
    const { section, media, positionVideo, positionMedia } = data
    if (section && media && positionVideo >= 0) {
      const payload: EventPayloads[EventNames.MEDIA_SECTION_TOGGLE_VIDEO] = {
        s2s_ea: 'tv',
        s2s_ec: 'c',
        s2s_el: 'full',
        s2s_pos: positionVideo,
        s2s_iid: '',
        s2s_title: section.name,
        s2s_urlMedia: media.props.src,
        s2s_type: media.type,
        s2s_positionMedia: positionMedia,
      }
      void this.sendEvent<EventNames.MEDIA_SECTION_TOGGLE_VIDEO>(payload, EventNames.MEDIA_SECTION_TOGGLE_VIDEO)
    }
  }
}

export type GoogleAnalyticsKeys = keyof GoogleAnalytics
export { GoogleAnalytics }
