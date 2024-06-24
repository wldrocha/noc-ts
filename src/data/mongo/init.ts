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
      return true
    } catch (error) {
      throw error
    }
  }
}
