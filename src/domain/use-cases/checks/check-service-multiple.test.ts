import { LogEntity } from '../../entities/log.entity'
import { CheckServiceMultiple } from './check-service-multiple'

describe('CheckService UseCase', () => {
  const mockRepositories = [
    {
      saveLog: jest.fn(),
      getLogs: jest.fn()
    },
    {
      saveLog: jest.fn(),
      getLogs: jest.fn()
    },
    {
      saveLog: jest.fn(),
      getLogs: jest.fn()
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const successCallback = jest.fn()
  const errorCallback = jest.fn()

  const checkServiceMultiple = new CheckServiceMultiple(mockRepositories, successCallback, errorCallback)

  test('should call success callback when fetch return true', async () => {
    const wasSuccessFull = await checkServiceMultiple.execute('https://www.google.com')

    expect(wasSuccessFull).toBeTruthy()

    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()
    expect(mockRepositories[0].saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepositories[1].saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepositories[2].saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
  })
  test('should call error callback when fetch return false', async () => {
    const wasSuccessFull = await checkServiceMultiple.execute('https://www.fadfadsfdss.com')

    expect(wasSuccessFull).toBeFalsy()

    expect(successCallback).not.toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalled()
    expect(mockRepositories[0].saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepositories[1].saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepositories[2].saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
  })
})
