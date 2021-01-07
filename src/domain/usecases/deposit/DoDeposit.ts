import { AccountDepositModel } from '@/domain/models/deposit/Account'

export interface DoDepositModel {
  accountOrigin: Number
  accountDestination: Number
  createdDate: Date
  sendDate: Date
  value: number
}

export interface DoDeposit {
  deposit: (deposit: DoDepositModel) => Promise<AccountDepositModel>
}
