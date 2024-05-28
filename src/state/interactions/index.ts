import { create } from 'zustand'
import { type IInteractionsState } from '~/state/interactions/typings'

const useInteractionsStore = create<IInteractionsState>()((set, get) => ({
  searchKey: '',
  setSearchKey: (searchKey: string) => {
    set(() => ({ searchKey }))
  },
}))

export { useInteractionsStore }
