'use client'

import SparkMD5 from 'spark-md5'
import { Buffer } from 'buffer'

import { useSchemaStore } from '~/state/schema'
import { CommonEventsArgs, GeolocationParameters, TimeParameters } from '~/utilities/event-tracker/typings'
import { BrowserService } from '~/utilities/browser-service'
import { EventLocation } from '../../enums'
import { useQueryStringStore } from '~/state/queryString'
import { getConfigForCountry } from '~/config'

const config = getConfigForCountry()
class CommonProviderClass {
  private static _instance: CommonProviderClass
  private static locationAccuracy = '100'

  private queryStringTrackToken = useQueryStringStore.getState().params.trackToken

  private token?: string = config.TRACKING.TOKEN

  constructor() {
    this.getCommonParams = this.getCommonParams.bind(this)
    this.getTimeParameters = this.getTimeParameters.bind(this)
    this.getGeolocationParams = this.getGeolocationParams.bind(this)
  }

  public static get instance(): CommonProviderClass {
    if (!this._instance) this._instance = new CommonProviderClass()
    return this._instance
  }

  public async getCommonParams(propertyId: string | null = null): Promise<CommonEventsArgs | void> {
    const state = useSchemaStore.getState()
    const { params: queryStringParams } = useQueryStringStore.getState()
    if (state.schema?.id || queryStringParams?.fid) {
      const dcid = await BrowserService.getFingerprint()

      const payload: CommonEventsArgs = {
        sf_sid: '',
        utm_source: queryStringParams.utm_source ?? 'direct',
        utm_medium: queryStringParams.utm_medium ?? 'sl',
        gclid: queryStringParams.gclid ?? '',
        fid: queryStringParams.fid ?? state.schema?.id ?? '',
        utm_campaign: queryStringParams.utm_campaign ?? state.schema?.name,
        a: 's2s',
        z: Math.floor(new Date().getTime() / 1000),
        c: queryStringParams.c ?? 'it_IT',
        t: queryStringParams.t ? queryStringParams.t : BrowserService.isWebview ? 'm' : 'w',
        dcid,
      }

      if (queryStringParams.propertyId) {
        payload.property_id = queryStringParams.propertyId
      } else if (propertyId) {
        payload.property_id = propertyId
      }

      return payload
    }
  }

  public getTimeParameters(nextEnToken: string | null = null): TimeParameters {
    const date = new Date()
    const isoTimestamp = date.toISOString()
    const time = date.getTime()
    const unixTimestamp = Math.floor(time / 1000)
    const expirationTimestamp = unixTimestamp + 300

    const tokenToUse = this.queryStringTrackToken ?? nextEnToken ?? this.token

    const md5security = SparkMD5.hash(`${expirationTimestamp} ${tokenToUse}`, true)

    const base64security = Buffer.from(md5security, 'binary').toString('base64')

    const securityToken = base64security.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')

    return {
      et: expirationTimestamp,
      st: securityToken,
      ts: isoTimestamp,
      z: unixTimestamp,
    }
  }

  public getGeolocationParams(): GeolocationParameters {
    const { x, y } = BrowserService.userHomePosition
    const { lm, la } = BrowserService.getQueryParameters()

    const geolocationParams: GeolocationParameters = {
      lat: `${x}`,
      lng: `${y}`,
      lm: lm || EventLocation.Backoff,
      la: la || CommonProviderClass.locationAccuracy,
    }
    return geolocationParams
  }
}

export const CommonProvider = CommonProviderClass.instance
