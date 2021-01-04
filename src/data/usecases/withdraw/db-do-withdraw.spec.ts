import { DoWithdrawModel } from '@/domain/usecases/withdraw/DoWithdraw'
import { DbDoWithdraw } from './db-do-withdraw'
import { DoWithdrawRepository } from '@/data/protocols/do-withdraw-repository'
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

const makeFakeWithdrawAccount = (): DoWithdrawModel => {
  return {
    accountOrigin: 1,
    createdDate: new Date('2020-01-01'),
    value: 100
  }
}

const makeDoWithdrawRepository = (): DoWithdrawRepository => {
  class DoWithdrawRepositoryStub implements DoWithdrawRepository {
    async withdraw (withdraw: DoWithdrawModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new DoWithdrawRepositoryStub()
}

interface SutTypes {
  sut: DbDoWithdraw
  doWithdrawRepositoryStub: DoWithdrawRepository
}

const makeSut = (): SutTypes => {
  const doWithdrawRepositoryStub = makeDoWithdrawRepository()
  const sut = new DbDoWithdraw(doWithdrawRepositoryStub)

  return { sut, doWithdrawRepositoryStub }
}

describe('DB Do Withdraw Use Case', () => {
  it('Should call DoWithdrawRepository with correct values ', async () => {
    const { sut, doWithdrawRepositoryStub } = makeSut()
    const spyRepository = jest.spyOn(doWithdrawRepositoryStub, 'withdraw')
    await sut.withdraw(makeFakeWithdrawAccount())

    expect(spyRepository).toHaveBeenCalledWith(makeFakeWithdrawAccount())
  })

  it('Should throws if DoWithdrawRepository throws', async () => {
    const { sut, doWithdrawRepositoryStub } = makeSut()
    jest.spyOn(doWithdrawRepositoryStub, 'withdraw')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.withdraw(makeFakeWithdrawAccount())
    await expect(promise).rejects.toThrow()
  })
})
