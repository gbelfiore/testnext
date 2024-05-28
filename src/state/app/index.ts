'use client'
import { create } from 'zustand'
import { IApp, eState } from './typings'

const LIMIT_MIN_DESKTOP = 758

const useAppStore = create<IApp>()((set, get) => ({
  loader: false,
  supportWebP: eState.LOADING,
  isClient: false,
  isDesktop: true,
  windowWidth: undefined,
  windowHeight: undefined,
  urlParams: undefined,
  isBackoffice: false,

  actions: {
    setAppInfo: (urlParams?: { slug: string; flyerId: string }, isBackoffice?: boolean) => {
      const isClient = true
      const isDesktop = window.innerWidth > LIMIT_MIN_DESKTOP
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      return set({ isDesktop, windowWidth, isClient, windowHeight, urlParams, isBackoffice: Boolean(isBackoffice) })
    },
    setLoader: (stateLoader: boolean) => {
      return set({ loader: stateLoader })
    },
    setSupportWebP: (state: eState) => {
      return set({ supportWebP: state })
    },
  },
}))

export { useAppStore }
