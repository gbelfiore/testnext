import { create } from 'zustand'
import { Range } from '@tanstack/react-virtual'

export enum EPosition {
  TOP = 'TOP',
  MIDDLE = 'MIDDLE',
  BOTTOM = 'BOTTOM',
}

export type TPosition = `${EPosition}`

export interface IFlyerUiState {
  isUserScrolling: boolean | undefined
  setIsUserScrolling: (param: boolean | undefined) => void
  scrollInterval: NodeJS.Timeout | undefined
  setScrollInterval: (param: NodeJS.Timeout | undefined) => void
  clearScrollInterval: () => void
  viewedOffers: IViewedOffers | undefined
  addElement: (productRef: string) => void
  position: TPosition
  setPosition: (param: Range) => void
  isUserOnboarded: boolean
  setIsUserOnboarded: (param: boolean) => void
}

export type IViewedOffers = {
  [id: string]: boolean
}

const useFlyerUi = create<IFlyerUiState>()((set, get) => ({
  isUserScrolling: undefined,
  setIsUserScrolling: (param: boolean | undefined) => {
    set(() => ({ isUserScrolling: param }))
  },
  scrollInterval: undefined,
  setScrollInterval: (param: NodeJS.Timeout | undefined) => {
    set(() => ({ scrollInterval: param }))
  },
  clearScrollInterval: () => {
    clearInterval(get().scrollInterval)
    // TODO - check and remove
    get().setScrollInterval(undefined)
  },
  viewedOffers: undefined,
  addElement: (productRef: string) =>
    set((state) => {
      const offer = {
        [productRef]: true,
      }
      return {
        viewedOffers: { ...state.viewedOffers, ...offer },
      }
    }),
  position: EPosition.TOP,
  setPosition: (param: Range) => {
    let newPosition: EPosition
    const { startIndex, endIndex, count } = param
    if (startIndex === 0) {
      newPosition = EPosition.TOP
    } else if (endIndex === count - 1) {
      newPosition = EPosition.BOTTOM
    } else {
      newPosition = EPosition.MIDDLE
    }
    if (newPosition !== get().position) {
      set(() => ({ position: newPosition }))
    }
  },
  isUserOnboarded: true,
  setIsUserOnboarded: (param: boolean) => {
    set({ isUserOnboarded: param })
  },
}))

export { useFlyerUi }
