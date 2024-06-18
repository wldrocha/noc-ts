import { CronJob } from 'cron'

export class Server {
  public static start() {
    console.log('Server started...')
    const job = new CronJob(
      '*/2 * * * * *', // cronTime
      function () {
        const today = new Date()
        console.log(`2 second'`, today)
      }, // onTick
     
    )
    job.start()
  }
}
