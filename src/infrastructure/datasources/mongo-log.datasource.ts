import { logModel } from '../../data/mongo'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

export class MongoLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const savedLog = await logModel.create(log)
    console.log("🚀 ~ MongoLogDataSource ~ saveLog ~ savedLog:", savedLog.id)
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await logModel.find({ level: severityLevel })

    return logs.map((mongoLog) => LogEntity.fromObject(mongoLog))
  }
}
