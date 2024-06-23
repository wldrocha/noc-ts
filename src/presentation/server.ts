import { envs } from '../config/plugins/env.plugins'
import { LogSeverityLevel } from '../domain/entities/log.entity'
import { CheckService } from '../domain/use-cases/checks/check-service'
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple'
import { SendEMailLogs } from '../domain/use-cases/email/send-logs'
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource'
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource'
import { PostgresLogDataSource } from '../infrastructure/datasources/postgres-log.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.respostory.impl'
import { CronService } from './service/cron-service'
import { EmailService } from './service/email.service'

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource())
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource())
const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDataSource())
const emailService = new EmailService()

export class Server {
  public static async start() {
    console.log('Server started...')


    // const isSendEmail = await emailService.sendEmailWithFileSystemLog(['wld.rocha@gmail.com', 'wrocha@grupov.com.ve'])
    // console.log('🚀 ~ Server ~ start ~ isSendEmail:', isSendEmail)
    // const logs = await logRepository.getLogs(LogSeverityLevel.medium)
    // console.log("🚀 ~ Server ~ start ~ logs:", logs)
    const job = CronService.createJob('*/5 * * * * *', () => {
      // const url = 'https://google.com'
      const url = 'https://localhost:3000'
      const date = new Date()
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        // undefined,
        // undefined
        () => console.log(`✅ ${url} - CheckService is ok`),

        (error) => console.log(`❌ ${date} - ${error}`)
      ).execute(url)
    })
  }
}
