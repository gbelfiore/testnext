'use client'
import { getConfigForCountry } from '~/config'
import { useQueryStringStore } from '~/state/queryString'
import GoogleConversion from '~/utilities/event-tracker/google-conversion'
import GoogleDeduplica from '~/utilities/event-tracker/google-deduplica'

declare global {
  interface Window {
    // TODO - Add better typing here
    OptanonWrapper: any
    OneTrust: any
    OnetrustActiveGroups: string
    gtag: (consent: string, type: string, config: NonNullable<unknown>) => void
  }
}

export class OneTrust {

  private static appendToHead() {
    const config = getConfigForCountry()
    document.documentElement.setAttribute('lang', config.SHARE.LANG)

    const mainScript = document.createElement('script')
    mainScript.async = true
    mainScript.type = 'text/javascript'
    mainScript.charset = 'UTF-8'
    mainScript.setAttribute('data-domain-script', config.COOKIE_POLICY.ONETRUST.SITE_ID)
    mainScript.setAttribute('data-document-language', 'true')
    mainScript.src = `https://cdn.cookielaw.org/scripttemplates/otSDKStub.js`
    document.head.appendChild(mainScript)
  }

  private static initConfiguration() {
    // window.OptanonWrapper = () => { }
    const wrapperScript = document.createElement('script')
    wrapperScript.type = 'text/javascript'
    wrapperScript.textContent = `function OptanonWrapper() {}`
    document.head.appendChild(wrapperScript)
  }

  static start() {
    OneTrust.initConfiguration()
    OneTrust.appendToHead()
    const { from_en } = useQueryStringStore.getState().params
    const isFromExtendedNetwork = from_en !== undefined
    const interval = setInterval((): any => {
      if (window.OneTrust) {
        clearInterval(interval)
        if (window.OnetrustActiveGroups) {
          console.info('ONE TRUST STARTING')
          const isCookieAccepted = window.OnetrustActiveGroups?.includes('C0004')
          gtag(isCookieAccepted, 'default')
          if(isCookieAccepted) {
            if(isFromExtendedNetwork) {
              GoogleConversion.sendGoogleConversion()
            }
            GoogleDeduplica.sendGoogleDeduplica()
          }
        }
        
        window.OneTrust.OnConsentChanged(() => {
          const isCookieAccepted = window.OnetrustActiveGroups?.includes('C0004')
          console.info('ONE TRUST CONSENT CHANGED', isCookieAccepted)
          gtag(isCookieAccepted, 'update')
          if(isCookieAccepted) {
            if(isFromExtendedNetwork) {
              GoogleConversion.sendGoogleConversion()
            }
            GoogleDeduplica.sendGoogleDeduplica()
          }
        })
      }
    }, 20)
  }
}

export const gtag = (isCookieAccepted: boolean, type: 'default' | 'update') => {
  console.log("isCookieAccepted", isCookieAccepted);
  
  if (window.gtag && typeof window.gtag == 'function') {
    window.gtag('consent', type, {
      analytics_storage: 'granted',

      ad_storage: isCookieAccepted ? 'granted' : 'denied',
      ad_user_data: isCookieAccepted ? 'granted' : 'denied',
      ad_personalization: isCookieAccepted ? 'granted' : 'denied',

      functionality_storage: 'denied',
      security_storage: 'denied',
      personalization_storage: 'denied',
    })
  }
}
