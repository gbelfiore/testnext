import { MongoClient } from 'mongodb'
import ConfigSSRSingleton from '~/config/configSSRSingleton'

class MongoDBConnectionSingleton {
  private static instance: Record<string, MongoDBConnectionSingleton> = {}
  private client: MongoClient
  private clientPromise: Promise<MongoClient>

  private constructor() {
    const config = ConfigSSRSingleton.getConfig()
    const options = {}
    const uri = config.MONGODB_URI as string
    this.client = new MongoClient(uri, options)
    this.clientPromise = this.client.connect()
  }

  public static getConnection() {
    const config = ConfigSSRSingleton.getConfig()
    if (!MongoDBConnectionSingleton.instance[config.ENVIRONMENT]) {
      MongoDBConnectionSingleton.instance[config.ENVIRONMENT] = new MongoDBConnectionSingleton()
    }
    return MongoDBConnectionSingleton.instance[config.ENVIRONMENT].clientPromise
  }
}

export default MongoDBConnectionSingleton
