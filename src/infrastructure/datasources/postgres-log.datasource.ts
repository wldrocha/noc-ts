import { PrismaClient, SeverityLevel } from '@prisma/client'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

const prismaClient = new PrismaClient()

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    await prismaClient.logModel.create({
      data: {
        level: log.level.toUpperCase() as SeverityLevel,
        message: log.message,
        origin: log.origin
      }
    })
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await prismaClient.logModel.findMany({
      where: {
        level: severityLevel.toUpperCase() as SeverityLevel
      }
    })
    return logs.map((log) => LogEntity.fromObject(log))
  }
}
