import { create } from 'zustand'
import { type IOptionsState } from '~/state/options/typings'
import { type ISectionOpt } from '~/typings/schemaopt'
import { RefsManager } from '~/utilities/refs-manager'
import { RefKeys } from '~/utilities/refs-manager/enum'

const useOptionsStore = create<IOptionsState>()((set, get) => ({
  vh: 0,
  currentScroll: 0,
  sectionStickyHeading: undefined,
  // stickyHeadingId: void 0,
  setVh: (vh: number) => {
    set(() => ({ vh }))
  },
  setCurrentScroll(currentScroll?: number) {
    set({ currentScroll })
  },
  setSectionStickyHeading: (section: ISectionOpt, isSetted: boolean) => {
    const stickyHeadingId = section.id

    if (isSetted) {
      const nav1 = RefsManager.getRef<HTMLDivElement>(RefKeys.NAV_1)
      const nav2 = RefsManager.getRef<HTMLDivElement>(RefKeys.NAV_2)
      const pill1Ref = RefsManager.getRef<HTMLButtonElement>(`${RefKeys.NAV_1}_${stickyHeadingId}`)
      const pill2Ref = RefsManager.getRef<HTMLButtonElement>(`${RefKeys.NAV_2}_${stickyHeadingId}`)

      if (pill1Ref?.ref && nav1?.ref) {
        const nav1ComputedStyle = globalThis.getComputedStyle(nav1.ref)
        const castedLeft = Number.parseFloat(nav1ComputedStyle.paddingLeft)
        nav1.ref.scroll({
          left: pill1Ref.ref.offsetLeft - castedLeft + 1,
          top: 0,
          behavior: 'smooth',
        })
      }

      if (pill2Ref?.ref && nav2?.ref) {
        const nav2ComputedStyle = globalThis.getComputedStyle(nav2.ref)
        const castedLeft = Number.parseFloat(nav2ComputedStyle.marginLeft)
        nav2.ref.scroll({
          left: pill2Ref.ref.offsetLeft - castedLeft + 1,
          top: 0,
          behavior: 'smooth',
        })
      }
      set(() => ({ sectionStickyHeading: section }))
    } else {
      const currentSectionStickyHeading = get().sectionStickyHeading
      if (currentSectionStickyHeading?.id == section.id) {
        set(() => ({ sectionStickyHeading: undefined }))
      }
    }
  },
}))

export { useOptionsStore }
