import { DoDepositRepository } from '@/data/protocols/do-deposit-repository'
import { AccountDepositModel } from '@/domain/models/deposit/Account'
import { DoDepositModel } from '@/domain/usecases/deposit/DoDeposit'

export class DbDoDeposit implements DoDepositRepository {
  constructor (private readonly doDepositRepository: DoDepositRepository) {}
  async deposit (deposit: DoDepositModel): Promise<AccountDepositModel> {
    const depositResponse = await this.doDepositRepository.deposit(deposit)
    return depositResponse
  }
}
