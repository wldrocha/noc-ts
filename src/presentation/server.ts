import { CheckService } from '../domain/use-cases/checks/check-service'
import { CronService } from './service/cron-service'

export class Server {
  public static start() {
    console.log('Server started...')

    const job = CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com'
      const date = new Date()
      new CheckService(
        () => console.log(`✅ ${url} - CheckService is ok`),
        (error) => console.log(`❌ ${date} - ${error}`)
      ).execute(url)
    })
  }
}
