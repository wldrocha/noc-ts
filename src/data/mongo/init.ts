import mongoose from 'mongoose'

interface ConnectionsOptions {
  mongoUrl: string
  dbName: string
}

export class MongoDatabase {
  static async connect({ mongoUrl, dbName }: ConnectionsOptions) {
    try {
      await mongoose.connect(mongoUrl, {
        dbName
      })
      console.log('Mongo connected')
    } catch (error) {
      console.log('Mongo connection error')
      throw error
    }
  }
}
