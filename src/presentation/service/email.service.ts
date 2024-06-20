import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugins'
import path from 'path'
import { LogRepository } from '../../domain/repository/log.repository'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments?: Attachment[]
}

interface Attachment {
  filename: string
  path: string
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  constructor(private readonly logRespository: LogRepository) {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options

    try {
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email sent',
        origin: 'email.service.ts'
      })
      throw new Error('Error on send email')

      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      })
      this.logRespository.saveLog(log)
      return true
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Email not sent',
        origin: 'email.service.ts'
      })
      this.logRespository.saveLog(log)
      return false
    }
  }

  sendEmailWithFileSystemLog(to: string | string[]) {
    const subject = 'Logs server file'
    const htmlBody = `
    <h1>System logs</h1>
    <p>Lorem impusm kdlfaklsdfkldklasfkladklsfklds</p>
    `
    const attachments: Attachment[] = [
      { filename: 'logs-all.log', path: path.resolve('./logs/logs-all.log') },
      { filename: 'logs-medium.log', path: path.resolve('./logs/logs-medium.log') },
      { filename: 'logs-hight.log', path: path.resolve('./logs/logs-hight.log') }
    ]

    return this.sendEmail({ to, subject, htmlBody, attachments })
  }
}
