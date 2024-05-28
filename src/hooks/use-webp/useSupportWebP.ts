import supportsWebP from 'supports-webp'
import { getConfigForCountry } from '~/config'
import { useAppStore } from '~/state/app'
import { eState } from '~/state/app/typings'

const useSupportWebP = () => {
  const supportWebP = useAppStore((state) => state.supportWebP)
  const config = getConfigForCountry()

  if (supportWebP == eState.LOADING) {
    if (config.ENABLE_WEBP) {
      supportsWebP
        .then((supported) => {
          if (supported) {
            useAppStore.getState().actions.setSupportWebP(eState.TRUE)
          } else {
            useAppStore.getState().actions.setSupportWebP(eState.FALSE)
          }
        })
        .catch((error) => console.log(error))
    } else {
      useAppStore.getState().actions.setSupportWebP(eState.FALSE)
    }
  }
}

export default useSupportWebP
