import { AccountValidator } from '@/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/erros'
import { badRequest, successResponse } from '@/presentation/helpers/http-helper'
import { PaymentController } from '@/presentation/controllers/payment/payment'
import { AccountModel } from '@/domain/models/account/Account'
import { DoPayment, DoPaymentModel } from '@/domain/usecases/payment/DoPayment'

const fakePaymentResponse: AccountModel = {
  id: 'abc',
  accountNumber: 1,
  type: 1,
  balance: 20,
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01')
}

const makeDoPayment = (): DoPayment => {
  class DoPaymentStub implements DoPayment {
    async payment (payment: DoPaymentModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(fakePaymentResponse))
    }
  }

  return new DoPaymentStub()
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
  sut: PaymentController
  accountValidatorStub: AccountValidator
  doPaymentStub: DoPayment
}

const makeSut = (): SutType => {
  const accountValidatorStub = makeAccountValidator()
  const doPaymentStub = makeDoPayment()
  const sut = new PaymentController(accountValidatorStub, doPaymentStub)
  return { sut, accountValidatorStub, doPaymentStub }
}

describe('Payment Controller', () => {
  describe('Validate Params', () => {
    it('Should return 400 if no account origin is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        createdDate: new Date('2020-09-09 15:30:30'),
        sendDate: new Date('2020-09-09 15:30:30'),
        value: 2.45
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('accountOrigin')))
    })
    it('Should return 400 if no code is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        accountOrigin: 1000,
        createdDate: new Date('2020-09-09 15:30:30'),
        sendDate: new Date('2020-09-09 15:30:30'),
        value: 2.45
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('code')))
    })
    it('Should return 400 if no created date is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        accountOrigin: 10000,
        code: 90000,
        sendDate: new Date('2020-09-09 15:30:30'),
        value: 2.45
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('createdDate')))
    })
    it('Should return 400 if no send date is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        accountOrigin: 10000,
        code: 90000,
        createdDate: new Date('2020-09-09 15:30:30'),
        value: 2.45
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('sendDate')))
    })
    it('Should return 400 if no value is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        accountOrigin: 10000,
        code: 90000,
        createdDate: new Date('2020-09-09 15:30:30'),
        sendDate: new Date('2020-09-09 15:30:30')
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('value')))
    })
    it('Should return 400 if value is equals to 0', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        accountOrigin: 10000,
        code: 90000,
        createdDate: new Date('2020-09-09 15:30:30'),
        sendDate: new Date('2020-09-09 15:30:30'),
        value: 0
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('value')))
    })
    it('Should return 400 if value is not a number', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        accountOrigin: 10000,
        code: 90000,
        createdDate: new Date('2020-09-09 15:30:30'),
        sendDate: new Date('2020-09-09 15:30:30'),
        value: 'adasd'
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new InvalidParamError('value')))
    })
    it('Should return 400 if account origin is invalid', async () => {
      const { sut, accountValidatorStub } = makeSut()

      jest.spyOn(accountValidatorStub, 'isValid')
        .mockReturnValueOnce(Promise.resolve(false))

      const httpRequest = {
        accountOrigin: 10000,
        code: 2130500,
        createdDate: new Date('2020-09-09 15:30:30'),
        sendDate: new Date('2020-09-09 15:30:30'),
        value: 2.45
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new InvalidParamError('accountOrigin')))
    })

    it('Should return 200 if all values is provided and it was make a payment', async () => {
      const { sut, doPaymentStub } = makeSut()

      const lastValue = 10
      const httpRequest = {
        accountOrigin: 10000,
        code: 90000,
        createdDate: new Date('2020-09-09 15:30:30'),
        sendDate: new Date('2020-09-09 15:30:30'),
        value: lastValue
      }
      const actualValue = fakePaymentResponse.balance - lastValue
      Object.assign(fakePaymentResponse, { balance: actualValue })

      jest.spyOn(doPaymentStub, 'payment').mockReturnValueOnce(new Promise(resolve => resolve(fakePaymentResponse)))

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(successResponse(fakePaymentResponse))
    })
  })
})
