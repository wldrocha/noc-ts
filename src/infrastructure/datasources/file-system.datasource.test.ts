import fs from 'fs'
import path from 'path'
import { FileSystemDataSource } from './file-system.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

describe('FileSystemDataSource', () => {
  const logPath = path.join(__dirname, '../../../logs')

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true })
  })
  test('should create log files if they do not exist', () => {
    const fileSystemDataSource = new FileSystemDataSource()
    const files = fs.readdirSync(logPath)

    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
  })

  test('should save a log in logs-all.log', () => {
    const fileSystemDataSource = new FileSystemDataSource()
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts'
    })

    fileSystemDataSource.saveLog(log)
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    expect(allLogs).toContain(JSON.stringify(log))
  })

  test('should save a log in logs-all.log and logs-medium.log', () => {
    const fileSystemDataSource = new FileSystemDataSource()
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts'
    })

    fileSystemDataSource.saveLog(log)
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')
    expect(allLogs).toContain(JSON.stringify(log))
    expect(mediumLogs).toContain(JSON.stringify(log))
  })

  test('should save a log in logs-all.log and logs-high.log', () => {
    const fileSystemDataSource = new FileSystemDataSource()
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts'
    })

    fileSystemDataSource.saveLog(log)
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')
    expect(allLogs).toContain(JSON.stringify(log))
    expect(highLogs).toContain(JSON.stringify(log))
  })

  test('should return all logs', async () => {
    const fileSystemDataSource = new FileSystemDataSource()
    const logLow = new LogEntity({
      message: 'log-low',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts'
    })
    const logMedium = new LogEntity({
      message: 'log-medium',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts'
    })
    const logHigh = new LogEntity({
      message: 'log-high',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts'
    })

    await fileSystemDataSource.saveLog(logLow)
    await fileSystemDataSource.saveLog(logMedium)
    await fileSystemDataSource.saveLog(logHigh)

    
    // console.log("🚀 ~ test ~ savedLogLow:", savedLogLow)
    const savedLogLow = await fileSystemDataSource.getLogs(LogSeverityLevel.low)
    const savedLogMedium = await fileSystemDataSource.getLogs(LogSeverityLevel.medium)
    const savedLogHigh = await fileSystemDataSource.getLogs(LogSeverityLevel.high)

    expect(savedLogLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]))
    expect(savedLogMedium).toEqual(expect.arrayContaining([logMedium]))
    expect(savedLogHigh).toEqual(expect.arrayContaining([logHigh]))
  })
})
