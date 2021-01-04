import { getRepository, Repository } from 'typeorm'

import { Account } from '@/infra/postgres/account/entities/Account'
import { AccountValidatorRepository } from '@/data/protocols/account-validator-repository'

export class AccountValidatorDatabaseRepository implements AccountValidatorRepository {
  private readonly ormRepository: Repository<Account>

  constructor () {
    this.ormRepository = getRepository(Account)
  }

  async isValid (accountNumber: Number): Promise<boolean> {
    const accountRepository = await this.ormRepository.find({
      where: {
        accountNumber
      }
    })

    if (accountRepository.length) {
      return true
    }
    return false
  }
}
