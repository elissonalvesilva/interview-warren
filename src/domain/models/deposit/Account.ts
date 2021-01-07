import { AccountModel } from '@/domain/models/account/Account'
export interface AccountDepositModel {
  accountOrigin: AccountModel
  accountDestination: AccountModel
}
