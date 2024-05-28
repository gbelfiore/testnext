enum eState {
  LOADING = 'loading',
  FALSE = 'false',
  TRUE = 'true',
}

interface IApp {
  loader: boolean
  supportWebP: eState
  isClient?: boolean
  isDesktop?: boolean
  windowWidth?: number
  windowHeight?: number
  urlParams?: { slug: string; flyerId: string }
  actions: IAppActions
  isBackoffice: boolean
}

interface IAppActions {
  setAppInfo: (urlParams?: { slug: string; flyerId: string }, isBackoffice?: boolean) => void
  setSupportWebP: (state: eState) => void
  setLoader: (stateLoader: boolean) => void
}

export type { IApp, IAppActions }
export { eState }
