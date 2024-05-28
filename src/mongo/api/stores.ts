import { cache } from 'react'
import { getStoresForFlyer } from '~/services/dcDataService'

const getStores = cache(async (country: string, flyerId: string) => {
  const res = await getStoresForFlyer(flyerId)

  return res
})

export { getStores }
