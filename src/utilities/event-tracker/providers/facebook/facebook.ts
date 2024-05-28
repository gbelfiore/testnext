import { EventNames } from '~/utilities/event-tracker/enums'
import type { IFBPixelWebEventViewerData, IFBPixelViewContentData } from './typings'
import type { EventPayloads } from '~/utilities/event-tracker/typings'
import QueryUrlUtility from '~/utilities/query-url-utility/QueryUrlUtility'
import { useSchemaStore } from '~/state/schema'
import { useQueryStringStore } from '~/state/queryString'
import { getConfigForCountry } from '~/config'

const config = getConfigForCountry()

enum FaceBookPixelEvent {
  FB_WEB_EVENT_VIEWER = 'FBwebEventViewer',
  VIEW_CONTENT = 'ViewContent',
}

const options = {
  autoConfig: true, // set pixel's autoConfig
  debug: false, // enable logs
}
const advancedMatching = {
  ct: '',
  country: config.FACEBOOK.COUNTRY,
  db: '',
  em: '',
  fn: '',
  ge: '',
  ln: '',
  ph: '',
  st: '',
  zp: '',
}

class FacebookPixel {
  private static _instance: FacebookPixel
  private _allowedMethods: EventNames[]
  private _fbPixels: string

  constructor() {
    const { isSv, fb_pixels } = useQueryStringStore.getState().params || {}
    this._fbPixels = isSv === '1' && fb_pixels ? fb_pixels : config.FACEBOOK.ID
    this._allowedMethods = this._fbPixels ? [EventNames.FLYER_OPEN] : []
  }

  public static get instance(): FacebookPixel {
    if (!this._instance) this._instance = new FacebookPixel()
    return this._instance
  }

  public get allowedMethods(): EventNames[] {
    return this._allowedMethods
  }

  // private pageView() {
  //   import('react-facebook-pixel')
  //     .then((x) => x.default)
  //     .then((ReactPixel) => {
  //       ReactPixel.init(this._fbPixels, advancedMatching, options)
  //       ReactPixel.pageView()
  //     })
  // }

  private trackCustom(event: FaceBookPixelEvent, data: IFBPixelWebEventViewerData): void {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(this._fbPixels, advancedMatching, options)
        ReactPixel.trackCustom(event, data)
      })
  }

  private track(event: FaceBookPixelEvent, data: IFBPixelViewContentData): void {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(this._fbPixels, advancedMatching, options)
        ReactPixel.track(event, data)
      })
  }

  public async [EventNames.FLYER_OPEN](): Promise<void> {
    const schema = useSchemaStore.getState().schema

    this.trackCustom(FaceBookPixelEvent.FB_WEB_EVENT_VIEWER, {
      flyer_id: schema?.id,
      retailer_slug: QueryUrlUtility.getRetailerSlug(),
      // category_slug: '???',
    })

    this.track(FaceBookPixelEvent.VIEW_CONTENT, {
      content_type: 'product',
      content_ids: [schema?.id],
    })
  }

  public async [EventNames.PRODUCT_IMPRESSION](): Promise<void> {}
  public async [EventNames.MEDIA_PRODUCT_IMPRESSION](): Promise<void> {}
  public async [EventNames.FLYOUT_OPEN](): Promise<void> {}
  public async [EventNames.CTA_CLICK](): Promise<void> {}
  public async [EventNames.FLYER_CLOSE](): Promise<void> {}
  public async sendEvent<T extends EventNames>(params: EventPayloads[T]): Promise<void> {}
}

export default FacebookPixel
