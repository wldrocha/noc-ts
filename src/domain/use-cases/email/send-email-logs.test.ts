import exp from 'constants'
import { EmailService } from '../../../presentation/service/email.service'
import { LogEntity } from '../../entities/log.entity'
import { SendEmailLogs } from './send-email-logs'

describe('Send Email Logs', () => {
  const mockEmailService = {
    sendEmailWithFileSystemLog: jest.fn().mockReturnValue(true)
  }
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository)
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should send email and save logs', async () => {

    const result = await sendEmailLogs.execute('jhondoe@gmail.com')
    expect(result).toBe(true)

    expect(mockEmailService.sendEmailWithFileSystemLog).toHaveBeenCalledTimes(1)
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
           createdAt: expect.any(Date),
           level: "low",
           message:"Log email sent",
           origin: "send-email-logs",
         })
  })
  test('should log in case of error', async () => {
    
    mockEmailService.sendEmailWithFileSystemLog = jest.fn().mockReturnValue(false)
    const result = await sendEmailLogs.execute('jhondoe@gmail.com')
    expect(result).toBe(false)

    expect(mockEmailService.sendEmailWithFileSystemLog).toHaveBeenCalledTimes(1)
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
           createdAt: expect.any(Date),
           level: "high",
           message:"Error: Email not sent",
           origin: "send-email-logs",
         })
  })
})
