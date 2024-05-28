import { type ISectionOpt } from '~/typings/schemaopt'

interface IOptionsState {
  vh: number
  currentScroll: number
  sectionStickyHeading?: ISectionOpt
  setVh: (vh: number) => void
  setCurrentScroll: (currentScroll?: number) => void
  setSectionStickyHeading: (section: ISectionOpt, isSetted: boolean) => void
}

export { IOptionsState }
