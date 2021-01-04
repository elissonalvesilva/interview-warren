import { AccountModel } from '@/domain/models/account/Account'

export interface DoWithdrawModel {
  accountOrigin: number
  createdDate: Date
  value: number
}

export interface DoWithdraw {
  withdraw: (withdraw: DoWithdrawModel) => Promise<AccountModel>
}
