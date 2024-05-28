import { create } from 'zustand'
import { IMultiProductsState } from './typings'

const useMultiProductsStore = create<IMultiProductsState>()((set, get) => ({
  activeProducts: {},

  setVariantIndex(sectionIndex: number, productIndex: number, variantIndex?: number) {
    const activeProducts = get().activeProducts || {}

    if (!activeProducts[sectionIndex]) {
      activeProducts[sectionIndex] = {}
    }

    activeProducts[sectionIndex][productIndex] = variantIndex ?? -1

    set({ activeProducts })
  },
}))
export { useMultiProductsStore }
