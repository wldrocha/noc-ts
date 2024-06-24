import { LogEntity } from '../../entities/log.entity'
import { CheckService } from './check-service'

describe('CheckService UseCase', () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const successCallback = jest.fn()
  const errorCallback = jest.fn()
  const checkService = new CheckService(mockRepository, successCallback, errorCallback)

  test('should call success callback when fetch return true', async () => {
    const wasSuccessFull = await checkService.execute('https://www.google.com')

    expect(wasSuccessFull).toBeTruthy()

    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
  })
  test('should call error callback when fetch return false', async () => {
    const wasSuccessFull = await checkService.execute('https://www.fadfadsfdss.com')

    expect(wasSuccessFull).toBeFalsy()

    expect(successCallback).not.toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalled()
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
  })
})
