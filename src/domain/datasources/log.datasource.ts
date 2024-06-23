import { LogEntity, LogSeverityLevel } from '../entities/log.entity'
// database origins
// business rules of how you want it to work
export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}
