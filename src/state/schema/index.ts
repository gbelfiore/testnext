import { create } from 'zustand'
import { type ISchemaOpt } from '~/typings/schemaopt'
import { NearestPoint } from '~/utilities/geospatial'
import { type ISchemaState } from '~/state/schema/typings'

import { BrowserService } from '~/utilities/browser-service'
import { TFlatMapProduct } from '~/typings/flatMapProducts'
import ProductUtils from '~/utilities/product/ProductUtils'
export const IS_USER_ONBOARDED = 'isUserOnboarded'

function assignStoreDistancesAndGetNearestStore(schema: ISchemaOpt) {
  const userLocation = BrowserService.userHomePosition
  const stores = schema.stores || []
  if (!stores.length) return null
  const storePoints = stores.map((store) => ({
    x: store.lat || 0,
    y: store.lon || 0,
  }))
  const { distances, minIndex } = NearestPoint.calculate(userLocation, storePoints)
  distances.forEach((distance, index) => {
    schema.stores![index]!.distance = stores[index]?.lat && stores[index]?.lon ? distance : undefined
  })
  const nearestStore = { ...stores[minIndex] }
  schema.stores!.sort((a, b) => a.distance! - b.distance! || 0)
  return nearestStore
}

function countProducts(schema: ISchemaOpt) {
  let countProducts = 0
  schema.sections?.forEach((section) => {
    countProducts += section.products ? section.products.filter((product) => !ProductUtils.checkMediaProduct(product)).length : 0
  })
  return countProducts
}

function initUseHomerPosition(schema: ISchemaOpt) {
  const firstStore = schema.stores ? schema.stores[0] : null

  if (firstStore?.lat && firstStore?.lon) {
    BrowserService.initUseHomerPosition({
      x: firstStore.lat,
      y: firstStore.lon,
    })

    return
  }

  BrowserService.initUseHomerPosition(null)
}

const useSchemaStore = create<ISchemaState>()((set, get) => ({
  schema: null,
  flatMapProducts: {},
  nearestStore: null,
  isFetchingSchema: true,
  fontInfo: {
    productCellSingleNameFontSize: '',
    productCellSingleNameFontSizeDesktop: '',
    productCellSingleNameFontWeight: '',
    productCellSingleNameFontFamily: '',
    productCellSingleNameLineHeight: '',
    productCellSingleNameLetterSpacing: '',
    productCellWideNameFontSize: '',
    productCellWideNameFontSizeDesktop: '',
    productCellWideNameFontWeight: '',
    productCellWideNameFontFamily: '',
    productCellWideNameLineHeight: '',
    productCellWideNameLetterSpacing: '',
    sectionHeaderFontSize: '',
    sectionHeaderFontSizeDesktop: '',
    sectionHeaderFontWeight: '',
    sectionHeaderFontFamily: '',
    sectionHeaderLineHeight: '',
    sectionHeaderLetterSpacing: '',
    priceTagDiscountedFontSize: '',
    priceTagDiscountedFontSizeDesktop: '',
    priceTagDiscountedFontWeight: '',
    priceTagDiscountedFontFamily: '',
    priceTagDiscountedLineHeight: '',
    priceTagDiscountedLetterSpacing: '',
  },
  productsCount: 0,
  setSchema: (data?: ISchemaOpt) => {
    if (!data) return

    initUseHomerPosition(data)
    const nearestStore = assignStoreDistancesAndGetNearestStore(data)
    const productsCount = countProducts(data)

    set(() => ({
      schema: data ?? null,
      nearestStore,
      productsCount,
    }))
  },

  setFlatMapProducts: (flatMap?: TFlatMapProduct) => {
    set(() => ({
      flatMapProducts: flatMap,
    }))
  },
}))

export { useSchemaStore }
