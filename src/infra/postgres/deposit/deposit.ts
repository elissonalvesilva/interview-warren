import { AccountModel } from '@/domain/models/deposit/Account'
import { Repository, getRepository } from 'typeorm'

import { DoDepositRepository } from '@/data/protocols/do-deposit-repository'
import { DoDepositModel } from '@/domain/usecases/deposit/DoDeposit'
import { Account } from '@/infra/postgres/account/entities/Account'

export class DoDepositDatabaseRepository implements DoDepositRepository {
  private readonly ormRepository: Repository<Account>

  constructor () {
    this.ormRepository = getRepository(Account)
  }

  async deposit (deposit: DoDepositModel): Promise<AccountModel> {
    const lastValue = await this.ormRepository.findOne({
      where: {
        accountNumber: deposit.accountDestination
      }
    })
    const actualValue = lastValue.balance + deposit.value
    await this.ormRepository
      .createQueryBuilder()
      .update(Account)
      .set({ balance: actualValue })
      .where('accountNumber = :accountNumber', { accountNumber: deposit.accountDestination })
      .execute()
    const response = Object.assign(lastValue, { balance: actualValue })
    return response
  }
}
