import { AccountDepositModel } from '@/domain/models/deposit/Account'
import { Repository, getRepository } from 'typeorm'

import { DoDepositRepository } from '@/data/protocols/do-deposit-repository'
import { DoDepositModel } from '@/domain/usecases/deposit/DoDeposit'
import { Account } from '@/infra/postgres/account/entities/Account'

export class DoDepositDatabaseRepository implements DoDepositRepository {
  private readonly ormRepository: Repository<Account>

  constructor () {
    this.ormRepository = getRepository(Account)
  }

  async deposit (deposit: DoDepositModel): Promise<AccountDepositModel> {
    const accountOrigin = await this.ormRepository.findOne({
      where: {
        accountNumber: deposit.accountOrigin
      }
    })

    const accountDestination = await this.ormRepository.findOne({
      where: {
        accountNumber: deposit.accountDestination
      }
    })

    const newBalanceAccountOrigin = accountOrigin.balance - deposit.value

    const newBalanceAccountDestination = accountDestination.balance + deposit.value

    /**
     * Update account origin balance
     */
    await this.ormRepository
      .createQueryBuilder()
      .update(Account)
      .set({ balance: newBalanceAccountOrigin })
      .where('accountNumber = :accountNumber', { accountNumber: deposit.accountOrigin })
      .execute()

    /**
     * Update account destination balance
     */
    await this.ormRepository
      .createQueryBuilder()
      .update(Account)
      .set({ balance: newBalanceAccountDestination })
      .where('accountNumber = :accountNumber', { accountNumber: deposit.accountDestination })
      .execute()

    const response = {
      accountOrigin,
      accountDestination
    }

    Object.assign(response.accountOrigin, { balance: newBalanceAccountOrigin })
    Object.assign(response.accountDestination, { balance: newBalanceAccountDestination })

    return response
  }
}
