export const enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}
export class LogEntity {
  public level: LogSeverityLevel
  public message: string
  public createdAt: Date

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level
    this.message = message
    this.createdAt = new Date()
  }

  static fromJson = (json: string): LogEntity => {
    const { level, message, createdAt } = JSON.parse(json)
    if (!level) throw new Error('Level is required')
    if (!message) throw new Error('Message is required')
    if (!createdAt) throw new Error('Created at is required')
    const log = new LogEntity(level, message)
    log.createdAt = new Date(createdAt)
    return log
  }
}
