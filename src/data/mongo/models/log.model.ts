import { Schema, model } from 'mongoose'
// export interface LogEntityOptions {
//     level: LogSeverityLevel
//     message: string
//     createdAt?: Date
//     origin: string
//   }

const logScheme = new Schema({
  level: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high']
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  origin: {
    type: String,
    required: true
  }
})

export const logModel = model('Log', logScheme)
