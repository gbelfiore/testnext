import { cache } from 'react'
import { getMongoDBClient } from '../mongodbclient'
import { populateTemplates } from './populate-templates'
import { populateTemplatesComponents } from './populate-templates-components'
import { updateProductsIds } from './updateProductsIds'

const getSa = cache(async (id: number, withTemplates = false) => {
  const mongoConnection = await getMongoDBClient()

  let sa = await mongoConnection.collection('storeAnnouncements').findOne({ $or: [{ id: id }, { childrenFlyerId: id }] })

  if (sa) {
    if (withTemplates) {
      const templatesResultData = populateTemplates(sa)
      const templatesComponentsResultData = populateTemplatesComponents(sa)

      const [templates, templatesComponents] = await Promise.all([templatesResultData, templatesComponentsResultData])

      sa.templates = templates
      sa.templatesComponents = templatesComponents
    }
    sa = await updateProductsIds(sa, id)
  }

  return sa
})

export { getSa }
