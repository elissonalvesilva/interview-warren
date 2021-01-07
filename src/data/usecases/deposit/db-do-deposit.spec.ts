import { DbDoDeposit } from '@/data/usecases/deposit/db-do-deposit'
import { DoDepositRepository } from '@/data/protocols/do-deposit-repository'
import { DoDepositModel } from '@/domain/usecases/deposit/DoDeposit'

import MockDate from 'mockdate'
import { AccountDepositModel } from '@/domain/models/deposit/Account'

const makeFakeResponseDeposit = (): AccountDepositModel => {
  const fakeResponseAccount = {
    accountOrigin: {
      id: '60503e92-7812-48ab-9c7d-7994e605d15b',
      accountNumber: 1,
      type: 1,
      balance: 950
    },
    accountDestination: {
      id: '05571a3a-d8d9-47a3-917a-4600ecbb8df0',
      accountNumber: 2,
      type: 1,
      balance: 1170
    }
  }
  return fakeResponseAccount
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
    async deposit (deposit: DoDepositModel): Promise<AccountDepositModel> {
      return new Promise(resolve => resolve(makeFakeResponseDeposit()))
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
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
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
