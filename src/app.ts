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

  // const newLog = await logModel.create({
  //   message: 'Test message to mongo',
  //   level: 'low',
  //   origin: 'app.ts'
  // })

  // await newLog.save()

  // console.log("🚀 ~ main ~ newLog:", newLog)

  const logs = await logModel.find()
  console.log('🚀 ~ main ~ logs', logs)
  // Server.start()
}
