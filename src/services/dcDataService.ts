import ConfigSSRSingleton from '~/config/configSSRSingleton'

const getStoresForFlyer = async (id: string, page?: number, limit?: number, ll?: string) => {
  const config = ConfigSSRSingleton.getConfig()

  limit = limit ?? 100
  page = page ?? 1

  const headers = new Headers()

  const buff = new Buffer(config.SHOPFULLY.USERNAME + ':' + config.SHOPFULLY.PASSWORD)
  const base64data = buff.toString('base64')

  headers.append('Authorization', 'Basic ' + base64data)
  headers.append('x-api-key', config.SHOPFULLY.FLAYERS_API_KEY)

  const configRequestInit: RequestInit = {
    method: 'GET',
    headers: headers as HeadersInit,
  }

  if (config.SHOPFULLY.FLYER_STORES_URL) {
    const flyerStoresUrlReplaced = config.SHOPFULLY.FLYER_STORES_URL.replace('[id]', id.toString())
    let storesUrl = `${flyerStoresUrlReplaced}?key=${config.SHOPFULLY.FLAYERS_API_KEY}&limit=${limit}&page=${page}`

    if (ll) {
      storesUrl = storesUrl + `&ll=${ll}&sort=distance&direction=asc`
    }

    const fetchReq = await fetch(storesUrl, configRequestInit)
    const stores = await fetchReq.json()

    const storesArray = []
    if (stores.data) {
      for (const store of stores.data) {
        const storeData = store['Store']

        const storeModel = {
          id: storeData.id,
          lat: storeData.lat,
          lon: storeData.lng,
          address: storeData.address,
          city: storeData.city,
          phone: storeData.phone,
          distance: storeData.distance ?? 0,
        }
        storesArray.push(storeModel)
      }
    }

    return { value: storesArray }
  } else return null
}

const getStoreOpeningHours = async (id: number) => {
  const config = ConfigSSRSingleton.getConfig()

  const headers = new Headers()

  const buff = new Buffer(config.SHOPFULLY.USERNAME + ':' + config.SHOPFULLY.PASSWORD)
  const base64data = buff.toString('base64')

  //headers.append('Content-Type', 'text/json');
  headers.append('Authorization', 'Basic ' + base64data)
  headers.append('x-api-key', config.SHOPFULLY.FLAYERS_API_KEY)

  const configRequestInit: RequestInit = {
    method: 'GET',
    headers: headers,
  }

  if (config.SHOPFULLY.STORE_OPENING_HOURS_URL) {
    const flyerStoresUrlReplaced = config.SHOPFULLY.STORE_OPENING_HOURS_URL.replace('[id]', id.toString())

    const response = await fetch(flyerStoresUrlReplaced + '?key=' + config.SHOPFULLY.FLAYERS_API_KEY, configRequestInit)

    return response.json()
  } else return null
}

export { getStoresForFlyer, getStoreOpeningHours }
