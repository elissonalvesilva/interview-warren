import { DoStatementModel } from '@/domain/usecases/statement/DoStatement'
import { DbDoStatement } from '@/data/usecases/statement/db-do-statement'
import { DoStatementRepository } from '@/data/protocols/do-statement-repository'
import { AccountModel } from '@/domain/models/account/Account'

const makeFakeAccount = (): AccountModel => {
  return {
    id: '1',
    accountNumber: 2,
    type: 1,
    balance: 2,
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01')
  }
}

const makeFakeStatementAccount = (): DoStatementModel => {
  return {
    accountOrigin: 1
  }
}

const makeDoWithdrawRepository = (): DoStatementRepository => {
  class DoStatementRepositoryStub implements DoStatementRepository {
    async statement (statement: DoStatementModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new DoStatementRepositoryStub()
}

interface SutTypes {
  sut: DbDoStatement
  doStatementRepositoryStub: DoStatementRepository
}

const makeSut = (): SutTypes => {
  const doStatementRepositoryStub = makeDoWithdrawRepository()
  const sut = new DbDoStatement(doStatementRepositoryStub)

  return { sut, doStatementRepositoryStub }
}

describe('DB Do Statement Use Case', () => {
  it('Should call DoStatementRepository with correct values ', async () => {
    const { sut, doStatementRepositoryStub } = makeSut()
    const spyRepository = jest.spyOn(doStatementRepositoryStub, 'statement')
    await sut.statement(makeFakeStatementAccount())

    expect(spyRepository).toHaveBeenCalledWith(makeFakeStatementAccount())
  })

  it('Should throws if DoStatementRepository throws', async () => {
    const { sut, doStatementRepositoryStub } = makeSut()
    jest.spyOn(doStatementRepositoryStub, 'statement')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.statement(makeFakeStatementAccount())
    await expect(promise).rejects.toThrow()
  })
})
