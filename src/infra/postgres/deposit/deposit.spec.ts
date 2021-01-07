import { Account } from '@/infra/postgres/account/entities/Account'
import { getConnection } from 'typeorm'
import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'
import { DoDepositDatabaseRepository } from '@/infra/postgres/deposit/deposit'
import { DoDepositModel } from '@/domain/usecases/deposit/DoDeposit'

const lastBalanceOrigin = 80
const lastBalanceDestination = 100

const makeFakeDepositAccount = (): DoDepositModel => {
  return {
    accountOrigin: 1,
    accountDestination: 2,
    createdDate: new Date('2020-01-01'),
    sendDate: new Date('2020-01-01'),
    value: 10
  }
}

const makeFakeAccounts = (): object[] => {
  const accounts = [
    {
      accountNumber: 1,
      type: 1,
      balance: lastBalanceOrigin
    },
    {
      accountNumber: 2,
      type: 1,
      balance: lastBalanceDestination
    }
  ]
  return accounts
}

const makeSut = (): DoDepositDatabaseRepository => {
  return new DoDepositDatabaseRepository()
}

describe('Do Deposit Database Repository', () => {
  beforeEach(async () => {
    await PostgresHelper.clear()
  })

  it('Should deposit change value from origin account and destination account with a deposit', async () => {
    const sut = makeSut()
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values(makeFakeAccounts())
      .execute()

    const fakeDepositAccount = makeFakeDepositAccount()
    await sut.deposit(fakeDepositAccount)

    const accountOrigin = await getConnection()
      .getRepository(Account)
      .createQueryBuilder('account')
      .where('account.accountNumber = :accountNumber', { accountNumber: fakeDepositAccount.accountOrigin })
      .getOne()

    const accountDestination = await getConnection()
      .getRepository(Account)
      .createQueryBuilder('account')
      .where('account.accountNumber = :accountNumber', { accountNumber: fakeDepositAccount.accountDestination })
      .getOne()

    const newAccountDestinationBalance = lastBalanceDestination + fakeDepositAccount.value
    const newAccountOriginBalance = lastBalanceOrigin - fakeDepositAccount.value

    expect(accountOrigin.balance).toEqual(newAccountOriginBalance)
    expect(accountDestination.balance).toEqual(newAccountDestinationBalance)
  })
})
