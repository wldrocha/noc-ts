import { CheckService } from '../domain/use-cases/checks/check-service'
import { CronService } from './service/cron-service'

export class Server {
  public static start() {
    console.log('Server started...')

    const job = CronService.createJob('*/5 * * * * *', () => {
      const date = new Date()
      new CheckService().execute('https://google.com')
    })
  }
}
