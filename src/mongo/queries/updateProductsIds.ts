import { ObjectId } from 'mongodb'
import { getMongoDBClient } from '../mongodbclient'

const getGbisAssociation = async (gbiAssociationId: ObjectId | string) => {
  const mongoConnection = await getMongoDBClient()

  const gbiAssociationResult = await mongoConnection.collection('saGbisAssociation').findOne({ _id: new ObjectId(gbiAssociationId) })

  return gbiAssociationResult?.products
}

const updateProductsIds = async (sa: any, flyerIdToUpdate?: number) => {
  if (!flyerIdToUpdate) {
    return sa
  }

  const parentId = sa.parentFlyerId || sa.id
  const childrenFlyerId = sa.childrenFlyerId || []
  const isValidFlyer = [...(parentId ? [parentId] : []), ...childrenFlyerId].includes(flyerIdToUpdate)

  if (!isValidFlyer) {
    return sa
  }

  sa.id = flyerIdToUpdate

  if (sa.gbiAssociationId) {
    const productsResult = await getGbisAssociation(sa.gbiAssociationId)

    for (let i = 0; i < (sa.sections || []).length; i++) {
      const section = sa.sections[i]
      for (let k = 0; k < (section.products || [])?.length; k++) {
        section.products[k].id = productsResult?.[flyerIdToUpdate]?.[section.products[k].id]
      }
    }
  }
  return sa
}

export { updateProductsIds }
