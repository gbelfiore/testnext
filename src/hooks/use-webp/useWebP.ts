import { useEffect, useMemo, useState } from 'react'
import useSupportWebP from './useSupportWebP'
import { useAppStore } from '~/state/app'
import { eState } from '~/state/app/typings'
import { getConfigForCountry } from '~/config'

interface IUseWebP {
  src: string
  webp: string
}

const useWebP = ({ src, webp }: IUseWebP) => {
  useSupportWebP()
  const config = getConfigForCountry()
  const supportWebP = useAppStore((state) => state.supportWebP)
  const [exists, setExists] = useState<eState>(config.ENABLE_WEBP ? eState.LOADING : eState.FALSE)

  useEffect(() => {
    if (config.ENABLE_WEBP) {
      if (supportWebP == eState.TRUE) {
        const img = new Image()
        img.onload = () => setExists(eState.TRUE)
        img.onerror = () => setExists(eState.FALSE)
        img.src = webp
      } else if (supportWebP == eState.FALSE) {
        setExists(eState.FALSE)
      }
    }
  }, [config.ENABLE_WEBP, supportWebP, webp])

  const getUrl = useMemo(() => {
    if (exists == eState.LOADING) {
      return null
    } else if (exists == eState.TRUE) {
      return webp
    } else {
      return src
    }
  }, [exists, src, webp])

  return getUrl
}

export default useWebP
