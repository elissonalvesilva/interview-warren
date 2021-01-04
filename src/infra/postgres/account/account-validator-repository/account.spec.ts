import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'
import { AccountValidatorDatabaseRepository } from '@/infra/postgres/account/account-validator-repository/account'

const makeSut = (): AccountValidatorDatabaseRepository => {
  return new AccountValidatorDatabaseRepository()
}

describe('Account Validator Repository', () => {
  beforeAll(async () => {
    await PostgresHelper.connect()
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })

  it('Should return true if exist a account', async () => {
    const sut = makeSut()

    const isValid = await sut.isValid(123)
    console.log(isValid)
  })
})
