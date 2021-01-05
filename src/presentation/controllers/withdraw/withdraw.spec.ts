import { AccountValidator } from '@/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/erros'
import { badRequest, successResponse } from '@/presentation/helpers/http-helper'
import { WithdrawController } from '@/presentation/controllers/withdraw/withdraw'
import { AccountModel } from '@/domain/models/account/Account'
import { DoWithdraw, DoWithdrawModel } from '@/domain/usecases/withdraw/DoWithdraw'

const fakeWithdrawResponse: AccountModel = {
  id: 'abc',
  accountNumber: 1,
  type: 1,
  balance: 20,
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01')
}

const makeDoWithdraw = (): DoWithdraw => {
  class DoWithdrawStub implements DoWithdraw {
    async withdraw (withdraw: DoWithdrawModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(fakeWithdrawResponse))
    }
  }

  return new DoWithdrawStub()
}

const makeAccountValidator = (): AccountValidator => {
  class AccountValidatorStub implements AccountValidator {
    async isValid (accountNumber: Number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }

  return new AccountValidatorStub()
}

interface SutType {
  sut: WithdrawController
  accountValidatorStub: AccountValidator
  doWithdrawStub: DoWithdraw
}

const makeSut = (): SutType => {
  const accountValidatorStub = makeAccountValidator()
  const doWithdrawStub = makeDoWithdraw()
  const sut = new WithdrawController(accountValidatorStub, doWithdrawStub)
  return { sut, accountValidatorStub, doWithdrawStub }
}

describe('Stament Controller', () => {
  describe('Validate Params', () => {
    it('Should return 400 if no account origin is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          createdDate: new Date('2020-09-09 15:30:30'),
          sendDate: new Date('2020-09-09 15:30:30'),
          value: 2.45
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('accountOrigin')))
    })
    it('Should return 400 if no created date is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          accountOrigin: 10000,
          code: 90000,
          sendDate: new Date('2020-09-09 15:30:30'),
          value: 2.45
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('createdDate')))
    })
    it('Should return 400 if no value is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          accountOrigin: 10000,
          code: 90000,
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
          code: 90000,
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
          code: 90000,
          createdDate: new Date('2020-09-09 15:30:30'),
          sendDate: new Date('2020-09-09 15:30:30'),
          value: 'adasd'
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new InvalidParamError('value')))
    })
    it('Should return 400 if account origin is invalid', async () => {
      const { sut, accountValidatorStub } = makeSut()

      jest.spyOn(accountValidatorStub, 'isValid')
        .mockReturnValueOnce(Promise.resolve(false))

      const httpRequest = {
        body: {
          accountOrigin: 10000,
          code: 2130500,
          createdDate: new Date('2020-09-09 15:30:30'),
          sendDate: new Date('2020-09-09 15:30:30'),
          value: 2.45
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new InvalidParamError('accountOrigin')))
    })

    it('Should return 200 if all values is provided and it was make a payment', async () => {
      const { sut, doWithdrawStub } = makeSut()

      const lastValue = 10
      const httpRequest = {
        body: {
          accountOrigin: 10000,
          code: 90000,
          createdDate: new Date('2020-09-09 15:30:30'),
          sendDate: new Date('2020-09-09 15:30:30'),
          value: lastValue
        }
      }
      const actualValue = fakeWithdrawResponse.balance - lastValue
      Object.assign(fakeWithdrawResponse, { balance: actualValue })

      jest.spyOn(doWithdrawStub, 'withdraw').mockReturnValueOnce(new Promise(resolve => resolve(fakeWithdrawResponse)))

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(successResponse(fakeWithdrawResponse))
    })
  })
})
