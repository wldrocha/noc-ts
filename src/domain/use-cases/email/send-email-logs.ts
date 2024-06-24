import { EmailService } from '../../../presentation/service/email.service'
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(private readonly emailService: EmailService, private readonly logRepository: LogRepository) {}
  async execute(to: string | string[]) {
    try {
      const isSent = await this.emailService.sendEmailWithFileSystemLog(to)
      if (!isSent) {
        throw new Error('Email not sent')
      }
      const log = new LogEntity({
        message: `Log email sent`,
        level: LogSeverityLevel.low,
        origin: 'send-email-logs'
      })
      this.logRepository.saveLog(log)

      return true
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: 'send-email-logs'
      })
      this.logRepository.saveLog(log)
      return false
    }
  }
}
