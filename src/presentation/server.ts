import { envs } from '../config/plugins/env.plugins'
import { CheckService } from '../domain/use-cases/checks/check-service'
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.respostory.impl'
import { CronService } from './service/cron-service'
import { EmailService } from './service/email.service'

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource())

export class Server {
  public static start() {
    console.log('Server started...')

    const emailService = new EmailService()
    emailService.sendEmail({
      to: 'wrocha@grupov.com.ve',
      subject: 'Test email',
      htmlBody: `
      <h1>Test email</h1>
      <p>Lorem impusm kdlfaklsdfkldklasfkladklsfklds</p>
      `
    })
    

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
