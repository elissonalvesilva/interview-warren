import { getRepository, Repository } from 'typeorm'

import { Account } from '@/infra/postgres/account/entities/Account'
import { AccountBalanceRepository } from '@/data/protocols/account-balance-repository'

export class AccountBalanceDatabaseRepository implements AccountBalanceRepository {
  private readonly ormRepository: Repository<Account>

  constructor () {
    this.ormRepository = getRepository(Account)
  }

  async getBalance (accountNumber: number): Promise<number> {
    const account = await this.ormRepository.findOne({
      where: {
        accountNumber: accountNumber
      }
    })

    return account.balance
  }
}
