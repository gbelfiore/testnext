import { cache } from 'react'
import { getMongoData } from '../getMongoData'
import { ISectionOpt } from '~/typings/schemaopt'
// import fs from 'fs'

const getData = cache(async (params: { flyerId: string; slug: string }) => {
  let schema
  if (params.slug.includes('test')) {
    const flyer = await import(`public/json/${params.flyerId}.json`)
    schema = flyer.value
  } else {
    const res = await getMongoData(params.flyerId)

    // keeping this to make development easier
    // fs.writeFileSync(`public/json/${params.flyerId}.json`, JSON.stringify({ value: res }, null, 2))
    schema = res
  }
  schema.sections?.forEach((sec: ISectionOpt) => {
    sec.products = sec.products?.filter((p) => !p.hide)
  })
  return { value: schema }
})

export { getData }
