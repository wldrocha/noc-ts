import mongoose from 'mongoose'
import { MongoDatabase } from './init'

describe('mongo/init.ts', () => {
  afterAll(() => {
    mongoose.connection.close()
  })
  test('should connect to MongoDB', async () => {
    const isConnected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!
    })

    expect(isConnected).toBeTruthy()
  })
  test('should throw an error', async () => {
    const mongoUrl = 'mongodb://localhost:27017'
    const dbName = 'non-existing-db'

    await expect(MongoDatabase.connect({ mongoUrl, dbName })).rejects.toThrow()
  })
})
