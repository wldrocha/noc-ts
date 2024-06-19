import { LogEntity, LogSeverityLevel } from '../entities/log.entity'


// allows you to call the datasource from the repository
export abstract class LogRepository {

  abstract saveLog(log: LogEntity): Promise<void>
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}
