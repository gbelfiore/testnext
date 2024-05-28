import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import { Map } from '~/components/flyer/header/stores/map'
import { useSchemaStore } from '~/state/schema'
import { StoreList } from '~/components/flyer/header/stores/list'
import { Section } from '~/components/flyer/header/section/Section'
import useTemplate from '~/hooks/use-template'
import { useTplStaticPath } from '~/hooks/use-static-path'
import { type IStoreOpt } from '~/typings/schemaopt'
import { BrowserService } from '~/utilities/browser-service'
import { HeaderStores } from '~/components/flyer/header/stores/header-stores/HeaderStores'
import { useQueryStringStore } from '~/state/queryString'
import isEmpty from 'lodash-es/isEmpty'
import styles from './Stores.module.css'
import classNames from 'classnames'
import { useAppStore } from '~/state/app'

const limitRadius: number = 30 //30km

const getUserMarker = () => {
  const userLocation = BrowserService.userHomePosition
  const userMarker = {
    position: {
      lat: userLocation.x,
      lon: userLocation.y,
    },
    textPopup: `user location`,
    icon: '/userPoi.png',
  }
  return userMarker
}

const StoresComponent = () => {
  //const isDesktop = useAppStore.getState().isDesktop;

  const allStores = useSchemaStore((state) => state.schema?.stores ?? [])
  const isDesktop = useAppStore((state) => state.isDesktop)
  const userMarker = getUserMarker()
  const [storeIdxOpenDetails, setStoreIdxOpenDetails] = useState<number | null>(null)
  const refStores = useRef<HTMLDivElement[]>([])

  const template = useTemplate()
  const poiSrc = useTplStaticPath(template?.retailerInfo.poi)

  const stores = useMemo((): IStoreOpt[] => {
    const storeId = useQueryStringStore.getState().params.storeId
    //const storeId = "";
    let stores: IStoreOpt[] = []
    if (storeId && !isEmpty(storeId)) {
      stores = allStores?.filter((s) => s.id == parseInt(storeId))
    }

    if (!stores || stores.length === 0) {
      stores = allStores?.filter((s) => (s.distance ? s.distance <= limitRadius : false))
    }
    if (allStores[0] && (!stores || stores.length === 0)) {
      stores[0] = allStores[0]
    }

    if (stores.length === 1) setStoreIdxOpenDetails(0)
    return stores
  }, [allStores])

  const markers = () => {
    const markers = stores?.map((store, idx) => {
      return {
        storeIdx: idx,
        position: { lat: store.lat!, lon: store.lon! },
        textPopup: `${store.address} - ${store.city}`,
        icon: poiSrc !== '' ? poiSrc : '/poi.png',
      }
    })
    return markers ?? []
  }

  const scrollToElement = useCallback((storeIdx: number | null) => {
    setTimeout(() => {
      if (storeIdx !== null) {
        const element = refStores.current[storeIdx]
        const y = element?.offsetTop
        document.querySelector('._scrollStores')?.scroll({
          top: y - 400,
          behavior: 'smooth',
        })
      }
    }, 150)
  }, [])

  const onClickMarker = useCallback(
    (storeIdx: number) => {
      setStoreIdxOpenDetails(storeIdx)
      scrollToElement(storeIdx)
    },
    [scrollToElement]
  )

  const onOpenDetailsStore = useCallback(
    (storeIdx: number | null) => {
      setStoreIdxOpenDetails(storeIdx)
      scrollToElement(storeIdx)
    },
    [scrollToElement]
  )

  const centerMap = useMemo((): [number, number] | undefined => {
    if (stores && storeIdxOpenDetails != null && stores[storeIdxOpenDetails]) {
      const store = stores[storeIdxOpenDetails]
      if (store?.lat && store?.lon) {
        return [store.lat, store.lon]
      }
    }
    return undefined
  }, [storeIdxOpenDetails, stores])

  const isStoresEmpty = useMemo((): boolean => {
    return !stores || stores.length === 0
  }, [stores])

  return (
    <Section
      otherStyle={{
        padding: '0px 19px 0 19px',
        maxWidth: 758,
        margin: '0 auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <HeaderStores count={stores?.length ?? 0} />
      <Map
        markers={markers()}
        userMarker={userMarker}
        key={`map_${markers.length}_${centerMap?.join('_')}_${isDesktop ? 300 : 180}`}
        onClickMarker={onClickMarker}
        centerMap={centerMap}
        height={isDesktop ? 300 : 180}
      />

      <div className={classNames(styles.list, '_scrollStores')}>
        {!isStoresEmpty && (
          <StoreList stores={stores} refStores={refStores} onOpenDetailsStore={onOpenDetailsStore} storeIdxOpenDetails={storeIdxOpenDetails} />
        )}
      </div>
    </Section>
  )
}

export const Stores = memo(StoresComponent)
