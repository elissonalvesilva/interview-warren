import { AccountValidator } from '@/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/erros'
import { badRequest, successResponse } from '@/presentation/helpers/http-helper'
import { DepositController } from '@/presentation/controllers/deposit/deposit'

const makeAccountValidator = (): AccountValidator => {
  class AccountValidatorStub implements AccountValidator {
    async isValid (accountNumber: Number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }

  return new AccountValidatorStub()
}

interface SutType {
  sut: DepositController
  accountValidatorStub: AccountValidator
}

const makeSut = (): SutType => {
  const accountValidatorStub = makeAccountValidator()
  const sut = new DepositController(accountValidatorStub)
  return { sut, accountValidatorStub }
}

describe('Deposit Controller', () => {
  describe('Validate Params', () => {
    it('Should return 400 if no account origin is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          accountDestination: 9102,
          createdDate: new Date('2020-09-09 15:30:30'),
          sendDate: new Date('2020-09-09 15:30:30'),
          value: 2.45
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('accountOrigin')))
    })
    it('Should return 400 if no account account destination is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          accountOrigin: 1000,
          createdDate: new Date('2020-09-09 15:30:30'),
          sendDate: new Date('2020-09-09 15:30:30'),
          value: 2.45
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('accountDestination')))
    })
    it('Should return 400 if no created date is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          accountOrigin: 10000,
          accountDestination: 90000,
          sendDate: new Date('2020-09-09 15:30:30'),
          value: 2.45
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('createdDate')))
    })
    it('Should return 400 if no account origin is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          accountOrigin: 10000,
          accountDestination: 90000,
          createdDate: new Date('2020-09-09 15:30:30'),
          value: 2.45
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('sendDate')))
    })
    it('Should return 400 if no value is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          accountOrigin: 10000,
          accountDestination: 90000,
          createdDate: new Date('2020-09-09 15:30:30'),
          sendDate: new Date('2020-09-09 15:30:30')
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('value')))
    })
    it('Should return 400 if value is equals to 0', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          accountOrigin: 10000,
          accountDestination: 90000,
          createdDate: new Date('2020-09-09 15:30:30'),
          sendDate: new Date('2020-09-09 15:30:30'),
          value: 0
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('value')))
    })
    it('Should return 400 if value is not a number', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          accountOrigin: 10000,
          accountDestination: 90000,
          createdDate: new Date('2020-09-09 15:30:30'),
          sendDate: new Date('2020-09-09 15:30:30'),
          value: 'adasd'
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new InvalidParamError('value')))
    })
    it('Should return 400 if account origin or account destination is not a number', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          accountOrigin: 'aaaa',
          accountDestination: 90000,
          createdDate: new Date('2020-09-09 15:30:30'),
          sendDate: new Date('2020-09-09 15:30:30'),
          value: 2.45
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new InvalidParamError('accountOrigin and accountDestination must to be a number')))
    })
    it('Should return 400 if account destination is invalid', async () => {
      const { sut, accountValidatorStub } = makeSut()

      jest.spyOn(accountValidatorStub, 'isValid')
        .mockReturnValueOnce(Promise.resolve(false))

      const httpRequest = {
        body: {
          accountOrigin: 10000,
          accountDestination: 2130500,
          createdDate: new Date('2020-09-09 15:30:30'),
          sendDate: new Date('2020-09-09 15:30:30'),
          value: 2.45
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new InvalidParamError('accountDestination')))
    })
    it('Should return 200 if all values is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          accountOrigin: 10000,
          accountDestination: 90000,
          createdDate: new Date('2020-09-09 15:30:30'),
          sendDate: new Date('2020-09-09 15:30:30'),
          value: 2.45
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(successResponse(httpRequest.body))
    })
  })
})
