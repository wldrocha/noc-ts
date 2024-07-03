import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
import { LogRepositoryImpl } from './log.respostory.impl'

describe('LogRepositoryImpl', () => {
  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const logRepository = new LogRepositoryImpl(mockLogDataSource)

  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('save log call the data source with argumentse', async () => {
    const log = {
      message: 'test',
      level: LogSeverityLevel.low
    } as LogEntity
    await logRepository.saveLog(log)

    expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log)
  })

  test('getLogs call the data source with arguments', async () => {
    await logRepository.getLogs(LogSeverityLevel.low)
    expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low)
  })
})
