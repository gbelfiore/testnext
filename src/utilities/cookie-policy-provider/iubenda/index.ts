'use client'
import { getConfigForCountry } from '~/config'
declare global {
  interface Window {
    _iub: any
  }
}

export class Iubenda {
  private static appendToHead(isClient?: boolean) {
    const mainScript = document.createElement('script')
    mainScript.async = true
    mainScript.type = 'text/javascript'
    mainScript.src = `//cdn.iubenda.com/cs/iubenda_cs.js`
    if (isClient) {
      // browser code
      document.head.appendChild(mainScript)

      const linkStyles = document.createElement('link')
      linkStyles.rel = 'stylesheet'
      linkStyles.href = '/iub.css'

      document.head.appendChild(linkStyles)
    }
  }

  private static initConfiguration(isClient?: boolean) {
    window._iub = {}
    const config = getConfigForCountry()

    if (isClient) {
      // browser code
      window._iub.csConfiguration = {
        lang: config.COOKIE_POLICY.IUBENDA.LANG,
        siteId: config.COOKIE_POLICY.IUBENDA.SITE_ID,
        cookiePolicyId: config.COOKIE_POLICY.IUBENDA.COOKIE_POLICY_ID,
        enableRemoteConsent: true,
        tcfVersion: 2,
        banner: {
          content: config.COOKIE_POLICY.IUBENDA.CONTENT,
          customizeButtonCaption: config.COOKIE_POLICY.IUBENDA.CUSTOMIZE_BUTTON_CAPTION,
          acceptButtonCaption: config.COOKIE_POLICY.IUBENDA.ACCEPT_BUTTON_CAPTION,
          cookiePolicyLinkCaption: config.COOKIE_POLICY.IUBENDA.COOKIE_POLICY_LINK_CAPTION,
          acceptButtonDisplay: true,
          customizeButtonDisplay: true,
          acceptButtonColor: '#A1CB5B',
          acceptButtonCaptionColor: 'white',
          backgroundColor: '#777794',
          rejectButtonDisplay: false,
          rejectButtonColor: '#85859f',
          customizeButtonColor: '#85859f',
          position: 'float-center',
          backgroundOverlay: true,
          closeButtonRejects: true,
          closeButtonCaption: config.COOKIE_POLICY.IUBENDA.CLOSE_BUTTON_CAPTION,
        },
        perPurposeConsent: true,
        consentOnContinuedBrowsing: false,
      }
    }
  }

  static start(isClient?: boolean) {
    Iubenda.initConfiguration(isClient)
    Iubenda.appendToHead(isClient)
  }
}
