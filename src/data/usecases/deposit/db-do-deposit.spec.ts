import { DbDoDeposit } from '@/data/usecases/deposit/db-do-deposit'
import { DoDepositRepository } from '@/data/protocols/do-deposit-repository'
import { AccountModel } from '@/domain/models/account/Account'
import { DoDepositModel } from '@/domain/usecases/deposit/DoDeposit'

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

const makeFakeDepositAccount = (): DoDepositModel => {
  return {
    accountOrigin: 1,
    accountDestination: 2,
    createdDate: new Date('2020-01-01'),
    sendDate: new Date('2020-01-01'),
    value: 1
  }
}

const makeDoDepositRepository = (): DoDepositRepository => {
  class DoDepositRepositoryStub implements DoDepositRepository {
    async deposit (deposit: DoDepositModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new DoDepositRepositoryStub()
}

interface SutTypes {
  sut: DbDoDeposit
  doDepositRepositoryStub: DoDepositRepository
}

const makeSut = (): SutTypes => {
  const doDepositRepositoryStub = makeDoDepositRepository()
  const sut = new DbDoDeposit(doDepositRepositoryStub)

  return { sut, doDepositRepositoryStub }
}

describe('DB Do Deposit Use Case', () => {
  it('Should call DoDepositRepository with correct values ', async () => {
    const { sut, doDepositRepositoryStub } = makeSut()
    const spyRepository = jest.spyOn(doDepositRepositoryStub, 'deposit')
    await sut.deposit(makeFakeDepositAccount())

    expect(spyRepository).toHaveBeenCalledWith(makeFakeDepositAccount())
  })

  it('Should throws if DoDepositRepository throws', async () => {
    const { sut, doDepositRepositoryStub } = makeSut()
    jest.spyOn(doDepositRepositoryStub, 'deposit')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.deposit(makeFakeDepositAccount())
    await expect(promise).rejects.toThrow()
  })
})
