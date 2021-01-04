import { AccountModel } from '@/domain/models/account/Account'

export interface DoPaymentModel {
  accountOrigin: number
  code: number
  createdDate: Date
  sendDate: Date
  value: number
}

export interface DoDeposit {
  deposit: (deposit: DoPaymentModel) => Promise<AccountModel>
}
