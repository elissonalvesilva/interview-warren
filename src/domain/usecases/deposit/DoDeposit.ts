import { AccountModel } from '@/domain/models/account/Account'

export interface DoDepositModel {
  accountOrigin: Number
  accountDestination: Number
  createdDate: Date
  sendDate: Date
  value: number
}

export interface DoDeposit {
  deposit: (deposit: DoDepositModel) => Promise<AccountModel>
}
