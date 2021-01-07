import { Account } from '@/infra/postgres/account/entities/Account'
import { getConnection } from 'typeorm'
import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'
import { DoPaymentDatabaseRepository } from '@/infra/postgres/payment/payment'
import { DoPaymentModel } from '@/domain/usecases/payment/DoPayment'

const lastBalance = 100

const makeFakePaymentAccount = (): DoPaymentModel => {
  return {
    accountOrigin: 1,
    code: 2,
    createdDate: new Date('2020-01-01'),
    sendDate: new Date('2020-01-01'),
    value: 10
  }
}

const makeFakeAccount = (): object => {
  return {
    accountNumber: 1,
    type: 1,
    lastBalance,
    balance: lastBalance
  }
}

const makeSut = (): DoPaymentDatabaseRepository => {
  return new DoPaymentDatabaseRepository()
}

describe('Do Payment Database Repository', () => {
  beforeEach(async () => {
    await PostgresHelper.clear()
  })

  it('Should balance change value with a payment', async () => {
    const sut = makeSut()
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values(makeFakeAccount())
      .execute()

    const fakePaymentAccount = makeFakePaymentAccount()
    await sut.payment(fakePaymentAccount)

    const response = await getConnection()
      .getRepository(Account)
      .createQueryBuilder('account')
      .where('account.accountNumber = :accountNumber', { accountNumber: fakePaymentAccount.accountOrigin })
      .getOne()

    const newBalance = lastBalance - fakePaymentAccount.value

    expect(response.balance).toEqual(newBalance)
  })
})
