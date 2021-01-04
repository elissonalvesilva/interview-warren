import { AccountModel } from '@/domain/models/deposit/Account'
import { DoDepositModel } from '@/domain/usecases/deposit/DoDeposit'

export interface DoDepositRepository {
  deposit: (deposit: DoDepositModel) => Promise<AccountModel>
}
