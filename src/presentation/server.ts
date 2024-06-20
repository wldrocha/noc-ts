import { envs } from '../config/plugins/env.plugins'
import { CheckService } from '../domain/use-cases/checks/check-service'
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.respostory.impl'
import { CronService } from './service/cron-service'

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource())

export class Server {
  public static start() {
    console.log('Server started...')
    console.log('🚀 ~ Server ~ start ~ envs:', envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY)

    // const job = CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com'
    //   // const url = 'https://localhost:3000'
    //   const date = new Date()
    //   new CheckService(
    //     fileSystemLogRepository,
    //     // undefined,
    //     // undefined
    //     () => console.log(`✅ ${url} - CheckService is ok`),

    //     (error) => console.log(`❌ ${date} - ${error}`)
    //   ).execute(url)
    // })
  }
}
