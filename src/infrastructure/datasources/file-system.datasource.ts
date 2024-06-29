import fs from 'fs'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = 'logs/'
  private readonly allLogsPath = 'logs/logs-all.log'
  private readonly mediumLogsPath = 'logs/logs-medium.log'
  private readonly highLogsPath = 'logs/logs-high.log'

  constructor() {
    this.createLogsFiles()
  }

  private createLogsFiles = () => {
    const allPaths = [this.allLogsPath, this.mediumLogsPath, this.highLogsPath]
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    allPaths.forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '')
      }
    })
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logToJson = `${JSON.stringify(newLog)}\n`

    fs.appendFileSync(this.allLogsPath, logToJson)
    if (newLog.level === LogSeverityLevel.low) return

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logToJson)
    } else {
      fs.appendFileSync(this.highLogsPath, logToJson)
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8')
    if (content === '') return []
    const logs = content.split('\n').map((log) => LogEntity.fromJson(log))
    return logs
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath)
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath)
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath)
      default:
        throw new Error(`${severityLevel} not implemented.`)
    }
  }

  //   private getLogPath = (level: LogSeverityLevel) => {
  //     const levels = {
  //       [LogSeverityLevel.low]: this.allLogsPath,
  //       [LogSeverityLevel.medium]: this.mediumLogsPath,
  //       [LogSeverityLevel.high]: this.highLogsPath
  //     }

  //     return levels[level] ?? this.allLogsPath
  //   }

  //   async saveLog(newLog: LogEntity): Promise<void> {
  //     const logToJson = `${JSON.stringify(newLog)}\n`

  //     fs.appendFileSync(this.allLogsPath, logToJson)
  //     if (newLog.level === LogSeverityLevel.low) return

  //     const logPath = this.getLogPath(newLog.level)
  //     fs.appendFileSync(logPath, logToJson)
  //   }
}
