import { envs } from './env.plugins'

describe('env.plugin.ts', () => {
  test('should return env options', () => {
    expect(envs).toEqual({
      MAILER_EMAIL: 'wld.rocha@gmail.com',
      MAILER_SECRET_KEY: 'yldu gddv cmxe gftz',
      MAILER_SERVICE: 'gmail',
      MONGO_URL: 'mongodb://wladi:123456789@localhost:27017/',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'wladi',
      MONGO_PASS: '123456789'
    })
  })

//   test('should return error if not found env options', async () => {
//     jest.resetModules()
//     process.env.MONGO_PASS = 12344

//     try {
//       await import('./env.plugins')
//       expect(true).toBe(false)
//     } catch (error) {
//     //   console.log('🚀 ~ test ~ error:', error)
//       expect(`${error}`).toContain(`Type 'number' is not assignable to type 'string'`)
//     }
//   })
})
