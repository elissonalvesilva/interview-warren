import { AccountModel } from '@/domain/models/account/Account'
import { DoWithdrawModel } from '@/domain/usecases/withdraw/DoWithdraw'

export interface DoWithdrawRepository {
  withdraw: (withdraw: DoWithdrawModel) => Promise<AccountModel>
}
