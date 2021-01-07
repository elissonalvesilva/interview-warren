import { getConnection } from 'typeorm'

import { Account } from '@/infra/postgres/account/entities/Account'
import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'
import { AccountValidatorDatabaseRepository } from '@/infra/postgres/account/account-validator-repository/account'

const makeFakeAccount = (): object => {
  return {
    accountNumber: 123,
    type: 1,
    balance: 100
  }
}

const makeSut = (): AccountValidatorDatabaseRepository => {
  return new AccountValidatorDatabaseRepository()
}

describe('Account Validator Database Repository', () => {
  beforeEach(async () => {
    await PostgresHelper.clear()
  })

  it('Should return true if exist a account', async () => {
    const sut = makeSut()
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values(makeFakeAccount())
      .execute()

    const isValid = await sut.isValid(123)
    expect(isValid).toBeTruthy()
  })
  it('Should return false if not exist a account', async () => {
    const sut = makeSut()

    const isValid = await sut.isValid(1234)
    expect(isValid).toBe(false)
  })
})
