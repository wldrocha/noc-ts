import { LogEntity, LogSeverityLevel } from '../entities/log.entity'
import { LogRepository } from './log.repository'

describe('log.repository.ts', () => {
  class MockLogRepository implements LogRepository {
    async saveLog(log: LogEntity): Promise<void> {
      return
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return []
    }
  }

    test('should test the abstract class', async () => {
        const mockLogRepository = new MockLogRepository()
    
        expect(mockLogRepository).toBeInstanceOf(MockLogRepository)
    
        expect(typeof mockLogRepository.getLogs).toBe('function')
        expect(typeof mockLogRepository.saveLog).toBe('function')

    
    })
})
