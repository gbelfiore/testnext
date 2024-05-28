import { Fragment } from 'react'
import { Store } from '../store/Store'
import { IStoreOpt } from '~/typings/schemaopt'

const StoreList = ({
  stores,
  refStores,
  onOpenDetailsStore,
  storeIdxOpenDetails,
}: {
  stores: IStoreOpt[]
  refStores: React.MutableRefObject<HTMLDivElement[]>
  onOpenDetailsStore: (storeIdx: number | null) => void
  storeIdxOpenDetails?: number | null
}) => {
  if (!stores || stores.length === 0) return null

  return stores.map((store, idx) => {
    return (
      <Fragment key={`ancor_${store.address}`}>
        <div ref={(el: HTMLDivElement) => (refStores.current[idx] = el)}></div>
        <Store store={store} storeIdx={idx} onOpenDetails={onOpenDetailsStore} openDetails={idx === storeIdxOpenDetails} />
      </Fragment>
    )
  })
}

export { StoreList }
