import { CronService } from './service/cron-service'

export class Server {
  public static start() {
    console.log('Server started...')

    const job = CronService.createJob('*/5 * * * * *', () => {
        const date = new Date()
        console.log('🚀 5 seconds', date)
    })
  }
}
