import { CronService } from './cron-service'

describe('CronService', () => {
  const mockTick = jest.fn()

  test('should create a job', (done) => {
    const job = CronService.createJob('* * * * * *', mockTick)
    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2)
      CronService.stopJob(job)
      done()
    }, 2000)
  })
})
