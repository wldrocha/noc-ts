import fs from 'fs'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = 'logs/'
  private readonly lowLogsPath = 'logs/low-logs.log'
  private readonly mediumLogsPath = 'logs/medium-logs.log'
  private readonly hightLogsPath = 'logs/hight-logs.log'

  constructor() {
    this.createLogsFiles()
  }

  private createLogsFiles = () => {
    const allPaths = [this.lowLogsPath, this.mediumLogsPath, this.hightLogsPath]
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    allPaths.forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '')
      }
    })
  }

  saveLog(log: LogEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error('Method not implemented.')
  }
}
