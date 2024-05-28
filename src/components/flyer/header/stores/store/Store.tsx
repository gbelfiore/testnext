import React, { memo, useCallback, useEffect, useState } from 'react'
import { type IOpeningHourOpt, type IStoreOpt } from '~/typings/schemaopt'
import { Name } from '~/components/flyer/header/stores/store/name/Name'
import { Distance } from '~/components/flyer/header/stores/store/distance/Distance'
import { StoreItem } from '~/components/flyer/header/stores/store/store-item/StoreItem'
import { Details } from './details/Details'
import useDistance from '~/hooks/use-distance'
import StoreServiceClass from '~/utilities/service/StoreServiceClass'
import { StoreItemContent } from './store-item/StoreItemContent'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'

interface IStoreProps {
  storeIdx: number
  store: IStoreOpt
  openDetails?: boolean
  onOpenDetails: (storeIdx: number | null) => void
}

const StoreComponent: React.FC<IStoreProps> = ({ store, storeIdx, onOpenDetails: onOpenDetailsProps, openDetails = false }) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const { address, city, distance } = store
  const [openingHours, setOpeningHours] = useState<IOpeningHourOpt[] | null>(store.openingHours ?? null)
  const distanceStore = useDistance(distance)

  const loadOpeningHours = useCallback(async () => {
    if (store?.id) {
      const storeService = new StoreServiceClass()
      const openingHours = await storeService.getOpeningHoursByStoreId(store?.id)
      setOpeningHours(openingHours)
    }
  }, [store])

  useEffect(() => {
    if (openDetails) {
      loadOpeningHours()
    }
  }, [loadOpeningHours, openDetails])

  const openingDetails = useCallback(async () => {
    if (!openDetails && !openingHours?.length) {
      await loadOpeningHours()
    }
    onOpenDetailsProps(openDetails ? null : storeIdx)
    // setOpenDetails(!openDetails);
  }, [loadOpeningHours, onOpenDetailsProps, openDetails, openingHours?.length, storeIdx])

  return (
    <StoreItem hasOpenDetails={openDetails}>
      <StoreItemContent onClick={openingDetails}>
        {/* {template?.retailerInfo.logo && <Logo src={logoSrc} />} */}
        <Name>
          <div
            className={'w-[95%] overflow-hidden text-ellipsis whitespace-nowrap tracking-[-0.2px]'}
            style={{ color: template?.cssVars.storeAddressTextColor ?? '#FFF' }}
          >
            {address}
          </div>
          <div
            className={'overflow-hidden text-clip whitespace-nowrap text-[10px] not-italic'}
            style={{ color: template?.cssVars?.storeCityTextColor ?? '#FFF' }}
          >
            {city}
          </div>
        </Name>
        <Distance>
          {distanceStore?.distance} {distanceStore?.unit}
        </Distance>
      </StoreItemContent>
      {openDetails && openingHours?.length ? <Details store={store} openingHours={openingHours} /> : null}
    </StoreItem>
  )
}

export const Store = memo(StoreComponent)
