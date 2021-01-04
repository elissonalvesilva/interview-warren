import { Repository, getRepository } from 'typeorm'
import { DoWithdrawModel } from '@/domain/usecases/withdraw/DoWithdraw'
import { AccountModel } from '@/domain/models/account/Account'
import { Account } from '@/infra/postgres/account/entities/Account'
import { DoWithdrawRepository } from '@/data/protocols/do-withdraw-repository'

export class DoWithdrawDatabaseRepository implements DoWithdrawRepository {
  private readonly ormRepository: Repository<Account>

  constructor () {
    this.ormRepository = getRepository(Account)
  }

  async withdraw (withdraw: DoWithdrawModel): Promise<AccountModel> {
    const lastValue = await this.ormRepository.findOne({
      where: {
        accountNumber: withdraw.accountOrigin
      }
    })

    const actualValue = lastValue.balance - withdraw.value
    await this.ormRepository
      .createQueryBuilder()
      .update(Account)
      .set({ balance: actualValue })
      .where('accountNumber = :accountNumber', { accountNumber: withdraw.accountOrigin })
      .execute()
    const response = Object.assign(lastValue, { balance: actualValue })
    return response
  }
}
