import { Account } from '@/infra/postgres/account/entities/Account'
import { getConnection } from 'typeorm'
import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'
import { DoPaymentDatabaseRepository } from '@/infra/postgres/payment/payment'
import { DoPaymentModel } from '@/domain/usecases/payment/DoPayment'

const lastBalance = 100

const makeFakeWithdrawAccount = (): DoPaymentModel => {
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
    balance: lastBalance
  }
}

const makeSut = (): DoPaymentDatabaseRepository => {
  return new DoPaymentDatabaseRepository()
}

describe('Do Withdraw Database Repository', () => {
  beforeEach(async () => {
    await PostgresHelper.clear()
  })

  it('Should balance change value with a withdraw', async () => {
    const sut = makeSut()
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values(makeFakeAccount())
      .execute()

    const fakeWithdrawAccount = makeFakeWithdrawAccount()
    await sut.payment(fakeWithdrawAccount)

    const response = await getConnection()
      .getRepository(Account)
      .createQueryBuilder('account')
      .where('account.accountNumber = :accountNumber', { accountNumber: fakeWithdrawAccount.accountOrigin })
      .getOne()

    const newBalance = lastBalance - fakeWithdrawAccount.value

    expect(response.balance).toEqual(newBalance)
  })
})
