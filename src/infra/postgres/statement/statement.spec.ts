import { AccountModel } from '@/domain/models/account/Account'
import { DoStatementModel } from './../../../domain/usecases/statement/DoStatement'
import { DoStatementDatabaseRepository } from '@/infra/postgres/statement/statement'
import { Account } from '@/infra/postgres/account/entities/Account'
import { getConnection } from 'typeorm'
import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'

const makeFakeStatementGet = (): DoStatementModel => {
  return {
    accountOrigin: 1
  }
}

const makeFakeAccount = (): AccountModel => {
  return {
    accountNumber: 1,
    type: 1,
    balance: 100,
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01')
  }
}

const makeSut = (): DoStatementDatabaseRepository => {
  return new DoStatementDatabaseRepository()
}

describe('Do Statement Database Repository', () => {
  beforeEach(async () => {
    await PostgresHelper.clear()
  })

  it('Should return account with statement', async () => {
    const sut = makeSut()
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values(makeFakeAccount())
      .execute()

    const response = await sut.statement(makeFakeStatementGet())
    delete response.id
    expect(response).toEqual(makeFakeAccount())
  })
})
