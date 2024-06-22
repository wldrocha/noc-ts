import { envs } from '../config/plugins/env.plugins'
import { LogSeverityLevel } from '../domain/entities/log.entity'
import { CheckService } from '../domain/use-cases/checks/check-service'
import { SendEMailLogs } from '../domain/use-cases/email/send-logs'
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource'
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.respostory.impl'
import { CronService } from './service/cron-service'
import { EmailService } from './service/email.service'

const logRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
  // new MongoLogDataSource()
)
const emailService = new EmailService()

export class Server {
  public static async start() {
    console.log('Server started...')

    // new SendEMailLogs(emailService, logRepository).execute(['wld.rocha@gmail.com', 'wrocha@grupov.com.ve'])

    // emailService.sendEmail({
    //   to: 'wrocha@grupov.com.ve',
    //   subject: 'Test email',
    //   htmlBody: `
    //   <h1>Test email</h1>
    //   <p>Lorem impusm kdlfaklsdfkldklasfkladklsfklds</p>
    //   `
    // })

    // const isSendEmail = await emailService.sendEmailWithFileSystemLog(['wld.rocha@gmail.com', 'wrocha@grupov.com.ve'])
    // console.log('🚀 ~ Server ~ start ~ isSendEmail:', isSendEmail)
    const logs = await logRepository.getLogs(LogSeverityLevel.low)
    console.log("🚀 ~ Server ~ start ~ logs:", logs)
    // const job = CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com'
    //   // const url = 'https://localhost:3000'
    //   const date = new Date()
    //   new CheckService(
    //     logRepository,
    //     // undefined,
    //     // undefined
    //     () => console.log(`✅ ${url} - CheckService is ok`),

    //     (error) => console.log(`❌ ${date} - ${error}`)
    //   ).execute(url)
    // })
  }
}
