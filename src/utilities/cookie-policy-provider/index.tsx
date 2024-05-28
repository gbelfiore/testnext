import { getConfigForCountry } from '~/config'
import { Iubenda } from './iubenda'
import { OneTrust, gtag } from './onetrust'
import { useAppStore } from '~/state/app'
import { useQueryStringStore } from '~/state/queryString'
import GoogleConversion from '../event-tracker/google-conversion'
import GoogleDeduplica from '../event-tracker/google-deduplica'

class CookiePolicyProvider {
  static qsType = 'm'
  static start() {
    const isBackoffice = useAppStore.getState().isBackoffice
    const { t, profilingConsent, isSv, from_en } = useQueryStringStore.getState().params
    const isFromExtendedNetwork = from_en !== undefined
    if (isBackoffice) return

    const config = getConfigForCountry()
    if (t !== CookiePolicyProvider.qsType && !isSv) {
      if (config.COOKIE_POLICY.PROVIDER == 'iubenda') Iubenda.start()
      if (config.COOKIE_POLICY.PROVIDER == 'oneTrust') OneTrust.start()
    }
    if (isSv) {
      const isCookieAccepted = profilingConsent === 'true'
      gtag(isCookieAccepted, 'default')
      if (isCookieAccepted) {
        console.info('CONSENT FROM RETAILER', isCookieAccepted)
        if (isFromExtendedNetwork) {
          GoogleConversion.sendGoogleConversion()
        }
        GoogleDeduplica.sendGoogleDeduplica()
      }
    }
  }
}

export default CookiePolicyProvider
