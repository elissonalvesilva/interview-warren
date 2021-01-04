import { AccountValidator } from '@/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/erros'
import { badRequest, successResponse } from '@/presentation/helpers/http-helper'
import { PaymentController } from '@/presentation/controllers/payment/payment'
// import { AccountModel } from '@/domain/models/deposit/Account'

// const fakeDepositResponse: AccountModel = {
//   id: 'abc',
//   accountNumber: 1,
//   type: 1,
//   balance: 110,
//   createdAt: new Date('2020-01-01'),
//   updatedAt: new Date('2020-01-01')
// }

// const makeDoPayment = (): DoPayment => {
//   class DoPaymentStub implements DoPayment {
//     async deposit (deposit: DoPaymentModel): Promise<AccountModel> {
//       return new Promise(resolve => resolve(fakeDepositResponse))
//     }
//   }

//   return new DoPaymentStub()
// }

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
}

const makeSut = (): SutType => {
  const accountValidatorStub = makeAccountValidator()
  const sut = new PaymentController(accountValidatorStub)
  return { sut, accountValidatorStub }
}

describe('Payment Controller', () => {
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
    it('Should return 400 if no code is provided', async () => {
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
      expect(httResponse).toEqual(badRequest(new MissingParamError('code')))
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
    it('Should return 400 if no account origin is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          accountOrigin: 10000,
          code: 90000,
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

    it('Should return 200 if all values is provided', async () => {
      const { sut } = makeSut()

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

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(successResponse({}))
    })

    // it('Should return 200 if all values is provided and it was make a deposit', async () => {
    //   const { sut } = makeSut()

    //   const lastValue = 10
    //   const httpRequest = {
    //     body: {
    //       accountOrigin: 10000,
    //       accountDestination: 90000,
    //       createdDate: new Date('2020-09-09 15:30:30'),
    //       sendDate: new Date('2020-09-09 15:30:30'),
    //       value: lastValue
    //     }
    //   }
    //   const actualValue = fakeDepositResponse.balance + lastValue
    //   Object.assign(fakeDepositResponse, { balance: actualValue })

    //   jest.spyOn(doDepositStub, 'deposit').mockReturnValueOnce(new Promise(resolve => resolve(fakeDepositResponse)))

    //   const httResponse = await sut.handle(httpRequest)
    //   expect(httResponse).toEqual(successResponse(fakeDepositResponse))
    // })
  })
})
