import fs from 'fs'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = 'logs/'
  private readonly allLogsPath = 'logs/logs-all.log'
  private readonly mediumLogsPath = 'logs/logs-medium.log'
  private readonly hightLogsPath = 'logs/logs-hight.log'

  constructor() {
    this.createLogsFiles()
  }

  private createLogsFiles = () => {
    const allPaths = [this.allLogsPath, this.mediumLogsPath, this.hightLogsPath]
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
      fs.appendFileSync(this.hightLogsPath, logToJson)
    }
  }
  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error('Method not implemented.')
  }

  //   private getLogPath = (level: LogSeverityLevel) => {
  //     const levels = {
  //       [LogSeverityLevel.low]: this.allLogsPath,
  //       [LogSeverityLevel.medium]: this.mediumLogsPath,
  //       [LogSeverityLevel.high]: this.hightLogsPath
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
