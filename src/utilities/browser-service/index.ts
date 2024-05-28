import fingerprintjs from '@fingerprintjs/fingerprintjs'
import { v5 as uuid } from 'uuid'
import { isDesktop } from 'react-device-detect'
import { type IPointGeo } from '~/typings/geospatial'
import QueryUrlUtility from '../query-url-utility/QueryUrlUtility'
import { type IQueryString } from '~/typings/queryString'

class BrowserServiceClass {
  private static _instance: BrowserServiceClass

  private uuidNamespace = '30c58a68-e499-4d61-b880-1dd9233dfd9f'
  private storageKey = 'fingerprint'
  private userAgent: string = globalThis.navigator?.userAgent ?? ''

  private _isDesktop = isDesktop
  private webviewRules: string[] = [
    // if it says it's a webview, let's go with that
    'WebView',
    // iOS webview will be the same as safari but missing "Safari"
    '(iPhone|iPod|iPad)(?!.*Safari)',
    // Android Lollipop and Above: webview will be the same as native but it will contain "wv"
    // Android KitKat to lollipop webview will put {version}.0.0.0
    'Android.*(wv|.0.0.0)',
    // old chrome android webview agent
    'Linux; U; Android',
  ]
  private webviewRegex = new RegExp('(' + this.webviewRules.join('|') + ')', 'ig')
  private _isWebview = !!this.userAgent.match(this.webviewRegex)
  private _isBackoffice = false
  private _userHomePosition: IPointGeo | null = null

  public static get instance(): BrowserServiceClass {
    if (!this._instance) this._instance = new BrowserServiceClass()
    return this._instance
  }

  public get isWebview(): boolean {
    return this._isWebview
  }

  public get userHomePosition() {
    return this._userHomePosition || { x: 0, y: 0 }
  }

  public get isDesktop(): boolean {
    const queryString = this.getQuerystring()
    if (queryString.backoffice === '1') return false
    return this._isDesktop
  }

  public get isBackoffice(): boolean {
    return this._isBackoffice
  }

  public async getFingerprint(): Promise<string> {
    //check fingerPrint into url (muid)
    const { muid } = this.getQueryParameters()
    if (muid) return muid

    //check fingerPrint into LocalStorage
    let userFingerprint = globalThis.localStorage.getItem(this.storageKey)
    if (userFingerprint) return userFingerprint

    //generate fingerPrint
    const promiseAgent = await fingerprintjs.load()
    const result = await promiseAgent.get({
      debug: process.env.NODE_ENV === 'development',
    })

    userFingerprint = uuid(result.visitorId, this.uuidNamespace)

    globalThis.localStorage.setItem(this.storageKey, userFingerprint)

    return userFingerprint
  }

  public getQueryParameters(): IQueryString {
    const { getObjectFromEntries } = QueryUrlUtility
    const urlSearchParams = new URLSearchParams(globalThis.location?.search)
    const params = getObjectFromEntries(urlSearchParams.entries())
    return params
  }

  public getQuerystring(search?: string): IQueryString {
    const { getObjectFromEntries } = QueryUrlUtility
    search = search || globalThis.location?.search
    const urlSearchParams = new URLSearchParams(search)
    const params = getObjectFromEntries(urlSearchParams.entries())
    return params
  }

  private checkLatLon(lat: string, lon: string): boolean {
    const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/
    const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/
    const validLat = regexLat.test(lat)
    const validLon = regexLon.test(lon)
    return validLat && validLon
  }

  public initUseHomerPosition(point: IPointGeo | null) {
    try {
      const { lat, lng, epoi } = this.getQueryParameters()

      if (lat && lng) {
        if (this.checkLatLon(lat, lng)) {
          this._userHomePosition = { x: +lat, y: +lng }
        } else {
          throw new Error(`[${lat},${lng}] - LAT and LON in queryString is not valid. Set same position first store [${point?.x},${point?.y}]`)
        }
      } else if (epoi) {
        const decodeEpoi = atob(epoi).split('|')
        const [lat, lng] = decodeEpoi
        if (lat && lng && this.checkLatLon(lat, lng)) {
          this._userHomePosition = { x: +lat, y: +lng }
        } else {
          throw new Error(
            `${epoi} - [${lat},${lng}] - LAT and LON of EPOI in queryString is not valid. Set same position first store [${point?.x},${point?.y}]`
          )
        }
      } else {
        this._userHomePosition = point
      }
    } catch (error) {
      console.warn(error)
      this._userHomePosition = point
    }
  }

  public getShareProductLink(sectionId?: string, productId?: string): string {
    const baseUrl = globalThis.location.origin + globalThis.location.pathname
    const queryString: Record<string, any> = this.getQueryParameters()
    if (productId) queryString.productId = productId
    if (sectionId) queryString.sectionId = sectionId

    const url = `${baseUrl}?${Object.keys(queryString)
      .map((key) => key + '=' + queryString[key])
      .join('&')}`
    return url
  }

  public isImageCached = (imagePath?: string): boolean => {
    if (!imagePath) return false

    const image = new Image()
    image.src = imagePath
    const isCached = image.complete
    image.src = ''
    return isCached
  }

  // private checkInclusion = (target: string, source: string): boolean => target.includes(source)

  public isServer = (): boolean => typeof window === 'undefined'
}

export const BrowserService = BrowserServiceClass.instance
