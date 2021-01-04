import { Repository, getRepository } from 'typeorm'

import { AccountModel } from '@/domain/models/account/Account'
import { Account } from '@/infra/postgres/account/entities/Account'
import { DoPaymentRepository } from '@/data/protocols/do-payment-repository'
import { DoPaymentModel } from '@/domain/usecases/payment/DoPayment'

export class DoPaymentDatabaseRepository implements DoPaymentRepository {
  private readonly ormRepository: Repository<Account>

  constructor () {
    this.ormRepository = getRepository(Account)
  }

  async payment (payment: DoPaymentModel): Promise<AccountModel> {
    const lastValue = await this.ormRepository.findOne({
      where: {
        accountNumber: payment.accountOrigin
      }
    })

    const actualValue = lastValue.balance - payment.value
    await this.ormRepository
      .createQueryBuilder()
      .update(Account)
      .set({ balance: actualValue })
      .where('accountNumber = :accountNumber', { accountNumber: payment.accountOrigin })
      .execute()
    const response = Object.assign(lastValue, { balance: actualValue })
    return response
  }
}
