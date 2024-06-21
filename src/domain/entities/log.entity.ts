export const enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export interface LogEntityOptions {
  level: LogSeverityLevel
  message: string
  createdAt?: Date
  origin: string
}
export class LogEntity {
  public level: LogSeverityLevel
  public message: string
  public createdAt: Date
  public origin: string

  constructor({ level, message, origin, createdAt = new Date() }: LogEntityOptions) {
    this.level = level
    this.message = message
    this.createdAt = createdAt
    this.origin = origin
  }

  static fromJson = (json: string): LogEntity => {
    const { level, message, createdAt, origin = 'log.entity.ts' } = JSON.parse(json)
    if (!level) throw new Error('Level is required')
    if (!message) throw new Error('Message is required')
    if (!createdAt) throw new Error('Created at is required')
    const log = new LogEntity({ level, message, createdAt, origin })
    log.createdAt = new Date(createdAt)
    return log
  }

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { level, message, createdAt, origin = 'log.entity.ts' } = object
    if (!level) throw new Error('Level is required')
    if (!message) throw new Error('Message is required')
    if (!createdAt) throw new Error('Created at is required')
    const log = new LogEntity({ level, message, createdAt, origin })
    log.createdAt = new Date(createdAt)
    return log
  }
}
