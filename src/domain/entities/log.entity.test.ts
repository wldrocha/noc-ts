import exp from 'constants'
import { LogEntity, LogSeverityLevel } from './log.entity'
import { create } from 'domain'

describe('LogEntity', () => {
  test('should create a LogEntity instance', () => {
    const dataObj = {
      origin: 'log.datasource.test.ts',
      message: 'test-message',
      level: LogSeverityLevel.low
    }
    const newLog = new LogEntity(dataObj)
    expect(newLog).toBeInstanceOf(LogEntity)
    expect(newLog.message).toBe(dataObj.message)
    expect(newLog.origin).toBe(dataObj.origin)
    expect(newLog.level).toBe(dataObj.level)
    expect(newLog.createdAt).toBeInstanceOf(Date)
  })

  test('should create a LogEntity instance from JSON', () => {
    const json = `{"level":"high","message":"https://localhost:3000 is not ok, TypeError: fetch failed","createdAt":"2024-06-23T12:47:50.007Z","origin":"check-service.ts"}`
    const log = LogEntity.fromJson(json)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe('https://localhost:3000 is not ok, TypeError: fetch failed')
    expect(log.origin).toBe('check-service.ts')
    expect(log.level).toBe(LogSeverityLevel.high)
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  test('should create a logEntity instance from object', () => {
    const dataObj = {
      origin: 'log.datasource.test.ts',
      message: 'test-message',
      level: LogSeverityLevel.low,
      createdAt: new Date()
    }
    const log = LogEntity.fromObject(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.level).toBe(dataObj.level)
    expect(log.createdAt).toBeInstanceOf(Date)
  })
})
