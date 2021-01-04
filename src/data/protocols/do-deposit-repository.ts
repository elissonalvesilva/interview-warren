import { AccountModel } from '@/domain/models/account/Account'
import { DoDepositModel } from '@/domain/usecases/deposit/DoDeposit'

export interface DoDepositRepository {
  deposit: (deposit: DoDepositModel) => Promise<AccountModel>
}
