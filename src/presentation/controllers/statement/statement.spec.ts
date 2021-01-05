import { AccountValidator } from '@/presentation/protocols'
import { InvalidParamError, MissingParamError } from '@/presentation/erros'
import { badRequest, successResponse } from '@/presentation/helpers/http-helper'
import { StatementController } from '@/presentation/controllers/statement/statement'
import { AccountModel } from '@/domain/models/account/Account'
import { DoStatement, DoStatementModel } from '@/domain/usecases/statement/DoStatement'

const fakeStatementResponse: AccountModel = {
  id: 'abc',
  accountNumber: 1,
  type: 1,
  balance: 20,
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01')
}

const makeDoStatement = (): DoStatement => {
  class DoStatementStub implements DoStatement {
    async statement (statement: DoStatementModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(fakeStatementResponse))
    }
  }

  return new DoStatementStub()
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
  sut: StatementController
  accountValidatorStub: AccountValidator
  doStatementStub: DoStatement
}

const makeSut = (): SutType => {
  const accountValidatorStub = makeAccountValidator()
  const doStatementStub = makeDoStatement()
  const sut = new StatementController(accountValidatorStub, doStatementStub)
  return { sut, accountValidatorStub, doStatementStub }
}

describe('Statement Controller', () => {
  describe('Validate Params', () => {
    it('Should return 400 if no account origin is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {}
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new MissingParamError('accountOrigin')))
    })

    it('Should return 400 if account origin is invalid', async () => {
      const { sut, accountValidatorStub } = makeSut()

      jest.spyOn(accountValidatorStub, 'isValid')
        .mockReturnValueOnce(Promise.resolve(false))

      const httpRequest = {
        body: {
          accountOrigin: '10000'
        }
      }

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(badRequest(new InvalidParamError('accountOrigin')))
    })

    it('Should return 200 if all values is provided and get a statement', async () => {
      const { sut, doStatementStub } = makeSut()
      const httpRequest = {
        body: { accountOrigin: 10000 }
      }

      jest.spyOn(doStatementStub, 'statement').mockReturnValueOnce(new Promise(resolve => resolve(fakeStatementResponse)))

      const httResponse = await sut.handle(httpRequest)
      expect(httResponse).toEqual(successResponse(fakeStatementResponse))
    })
  })
})
