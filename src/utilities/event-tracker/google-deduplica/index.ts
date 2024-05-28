import { useSchemaStore } from '~/state/schema'

class GoogleDeduplica {
  private static _isCalled: boolean = false
  public static sendGoogleDeduplica() {
    if (GoogleDeduplica._isCalled) return
    console.log('SENDING GOOGLE DEDUPLICA')
    const flyerId = useSchemaStore.getState().schema?.id
    if ((globalThis as any).gtag && flyerId) {
      ;(globalThis as any).gtag('event', 'EnFlyerOpen', {
        send_to: 'AW-812359052',
        en_flyer_id: String(flyerId),
        country: 'it',
        source: 'dvc-marketplace',
      })
      GoogleDeduplica._isCalled = true
    }
  }
}

export default GoogleDeduplica
