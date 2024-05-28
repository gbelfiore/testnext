import { create } from 'zustand'
import { IMultiImagesState } from './typings'

const useMultiImagesStore = create<IMultiImagesState>()((set, get) => ({
  activeImages: {},

  setImageIndex(sectionIndex: number, productIndex: number, variantIndex: number, imageIndex: number = 0) {
    const activeImages = get().activeImages || {}

    if (!activeImages[sectionIndex]) {
      activeImages[sectionIndex] = {}
    }
    if (!activeImages[sectionIndex][productIndex]) {
      activeImages[sectionIndex][productIndex] = {}
    }

    activeImages[sectionIndex][productIndex][variantIndex + 1] = imageIndex

    set({ activeImages })
  },
}))
export { useMultiImagesStore }
