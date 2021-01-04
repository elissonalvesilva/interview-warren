import { Account } from '@/infra/postgres/account/entities/Account'
import { getConnection } from 'typeorm'
import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'
import { DoDepositDatabaseRepository } from '@/infra/postgres/deposit/deposit'
import { DoDepositModel } from '@/domain/usecases/deposit/DoDeposit'

const lastBalance = 100

const makeFakeDepositAccount = (): DoDepositModel => {
  return {
    accountOrigin: 1,
    accountDestination: 2,
    createdDate: new Date('2020-01-01'),
    sendDate: new Date('2020-01-01'),
    value: 10
  }
}

const makeFakeAccount = (): object => {
  return {
    accountNumber: 2,
    type: 1,
    balance: lastBalance
  }
}

const makeSut = (): DoDepositDatabaseRepository => {
  return new DoDepositDatabaseRepository()
}

describe('Do Deposit Database Repository', () => {
  beforeEach(async () => {
    await PostgresHelper.clear()
  })

  it('Should deposit change value with a deposit', async () => {
    const sut = makeSut()
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values(makeFakeAccount())
      .execute()

    const fakeDepositAccount = makeFakeDepositAccount()
    await sut.deposit(fakeDepositAccount)

    const response = await getConnection()
      .getRepository(Account)
      .createQueryBuilder('account')
      .where('account.accountNumber = :accountNumber', { accountNumber: fakeDepositAccount.accountDestination })
      .getOne()

    const newBalance = fakeDepositAccount.value + lastBalance

    expect(response.balance).toEqual(newBalance)
  })
})
