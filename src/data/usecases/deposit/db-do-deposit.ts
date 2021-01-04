import { DoDepositRepository } from '@/data/protocols/do-deposit-repository'
import { AccountModel } from '@/domain/models/account/Account'
import { DoDepositModel } from '@/domain/usecases/deposit/DoDeposit'

export class DbDoDeposit implements DoDepositRepository {
  constructor (private readonly doDepositRepository: DoDepositRepository) {}
  async deposit (deposit: DoDepositModel): Promise<AccountModel> {
    const depositResponse = await this.doDepositRepository.deposit(deposit)
    return depositResponse
  }
}
