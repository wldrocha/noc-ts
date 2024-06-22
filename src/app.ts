import { PrismaClient } from '@prisma/client'
import { envs } from './config/plugins/env.plugins'
import { MongoDatabase, logModel } from './data/mongo'
import { Server } from './presentation/server'
;(async () => {
  main()
})()

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  const prisma = new PrismaClient()

  const newLog = await prisma.logModel.create({
    data: {
      level: 'HEIGH',
      message: 'test 2 save with prisma on psotgres',
      origin: 'app.ts'
    }
  })
  console.log('🚀 ~ main ~ newLog:', newLog)

  Server.start()
}
