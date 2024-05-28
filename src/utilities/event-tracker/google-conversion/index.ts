import { getConfigForCountry } from '~/config'

class GoogleConversion {
  private static _isCalled: boolean = false

  public static sendGoogleConversion() {
    if (GoogleConversion._isCalled) return
    console.log('SENDING GOOGLE CONVERSION')

    if ((globalThis as any).gtag) {
      const { CONVERSION_ID, CONVERSION_LABEL } = getConfigForCountry().GOOGLE_ADS
      ;(globalThis as any).gtag('event', 'conversion', {
        send_to: `${CONVERSION_ID}/${CONVERSION_LABEL}`,
      })
      GoogleConversion._isCalled = true
    }
  }
}

export default GoogleConversion
