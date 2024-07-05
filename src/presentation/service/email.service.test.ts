import nodemailer from 'nodemailer'
import path from 'path'
import { EmailService, SendMailOptions } from './email.service'

describe('EmailService', () => {
  const mockSendMail = jest.fn()
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  })
  const emailService = new EmailService()

  test('should send email', async () => {
    const options: SendMailOptions = {
      to: 'wld.rocha@google.com',
      subject: 'Test email',
      htmlBody: '<h1>Hello world with test</h1>'
    }

    await emailService.sendEmail(options)

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: '<h1>Hello world with test</h1>',
      subject: 'Test email',
      to: 'wld.rocha@google.com'
    })
  })

  test('should send email with attachments', async () => {
    const email = 'hola@hola.com'
    await emailService.sendEmailWithFileSystemLog(email)
    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: 'Logs server file',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: 'logs-all.log', path: path.resolve('./logs/logs-all.log') },
        { filename: 'logs-medium.log', path: path.resolve('./logs/logs-medium.log') },
        { filename: 'logs-high.log', path: path.resolve('./logs/logs-high.log') }
      ])
    })
  })
})
