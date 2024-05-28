import { cache } from 'react'
import { getData } from './schema'
import { getStores } from './stores'

const getSchemaWithStore = cache(async (params: { flyerId: string; slug: string }, searchParams: any) => {
  const flyerData = getData(params)
  const storesData = params.slug != 'test' ? getStores(searchParams.country, params.flyerId) : Promise.resolve({ value: [] })

  const [flyer, stores] = await Promise.all([flyerData, storesData])

  if (flyer.value?.stores) flyer.value.stores = stores?.value ?? []

  return flyer
})

export { getSchemaWithStore }
