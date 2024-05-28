import type { ObjectId } from 'mongodb'
import { getMongoDBClient } from '../mongodbclient'
import { populateTemplates } from './populate-templates'
import { updateProductsIds } from './updateProductsIds'
import { populateTemplatesComponents } from './populate-templates-components'
import { cache } from 'react'

const getSaById = cache(async (_id: ObjectId, withTemplate = false) => {
  const mongoConnection = await getMongoDBClient()

  let sa = await mongoConnection.collection('storeAnnouncements').findOne({ _id: _id })

  if (sa) {
    if (withTemplate) {
      const templatesResultData = populateTemplates(sa)
      const templatesComponentsResultData = populateTemplatesComponents(sa)

      const [templates, templatesComponents] = await Promise.all([templatesResultData, templatesComponentsResultData])

      sa.templates = templates
      sa.templatesComponents = templatesComponents
    }
    sa = await updateProductsIds(sa)
  }

  return sa
})

export { getSaById }
