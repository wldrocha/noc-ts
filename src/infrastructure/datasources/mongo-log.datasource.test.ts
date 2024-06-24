import mongoose from 'mongoose'
import { envs } from '../../config/plugins/env.plugins'
import { MongoDatabase, logModel } from '../../data/mongo'
import { MongoLogDataSource } from './mongo-log.datasource'
import { log } from 'console'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

describe('mongo-log.datasource.ts', () => {
  const logDataSource = new MongoLogDataSource()
  const newLog = new LogEntity({
    level: LogSeverityLevel.low,
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts'
  })
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    })
  })

  afterEach(async () => {
    await logModel.deleteMany()
  })

  afterAll(async () => {
    mongoose.connection.close()
  })

  test('should create a log on DB', async () => {
    const logSpy = jest.spyOn(console, 'log')
    await logDataSource.saveLog(newLog)

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith('🚀 ~ MongoLogDataSource ~ saveLog ~ savedLog:', expect.any(String))
  })

  test('should get logs from DB', async () => {
    await logDataSource.saveLog(newLog)
    await logDataSource.saveLog(newLog)
    const logs = await logDataSource.getLogs(LogSeverityLevel.low)

    expect(logs).toHaveLength(2)
    expect(logs[0].level).toBe(LogSeverityLevel.low)
  })
})
