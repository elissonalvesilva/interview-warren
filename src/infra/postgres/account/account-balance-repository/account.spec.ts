import { getConnection } from 'typeorm'

import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'
import { AccountBalanceDatabaseRepository } from '@/infra/postgres/account/account-balance-repository/account'
import { Account } from '@/infra/postgres/account/entities/Account'

const balance = 100

const makeFakeAccount = (): object => {
  return {
    accountNumber: 123,
    type: 1,
    balance
  }
}

const makeSut = (): AccountBalanceDatabaseRepository => {
  return new AccountBalanceDatabaseRepository()
}

describe('Account Balance Database Repository', () => {
  beforeEach(async () => {
    await PostgresHelper.clear()
  })
  it('Should return balance value', async () => {
    const sut = makeSut()
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values(makeFakeAccount())
      .execute()

    const account = await sut.getBalance(123)
    expect(account).toEqual(balance)
  })
})
