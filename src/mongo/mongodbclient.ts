'use strict'
import MongoDBConnectionSingleton from '~/mongo/lib/mongoDBConnectionSingleton'

const getMongoDBClient = async () => {
  const clientPromise = MongoDBConnectionSingleton.getConnection()
  return (await clientPromise).db()
}

export { getMongoDBClient }
