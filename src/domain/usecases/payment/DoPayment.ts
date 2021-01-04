import { AccountModel } from '@/domain/models/account/Account'

export interface DoPaymentModel {
  accountOrigin: number
  code: number
  createdDate: Date
  sendDate: Date
  value: number
}

export interface DoPayment {
  deposit: (deposit: DoPaymentModel) => Promise<AccountModel>
}
