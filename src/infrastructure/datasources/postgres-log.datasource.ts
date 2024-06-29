import { PrismaClient, SeverityLevel } from '@prisma/client'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

const prismaClient = new PrismaClient()

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH
}

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const savedLog = await prismaClient.logModel.create({
      data: {
        level: severityEnum[log.level],
        message: log.message,
        origin: log.origin
      }
    })
    console.log('🚀 ~ PostgresLogDataSource ~ saveLog ~ savedLog:', savedLog)
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await prismaClient.logModel.findMany({
      where: {
        level: severityEnum[severityLevel]
      }
    })
    return logs.map(LogEntity.fromObject)
  }
}
