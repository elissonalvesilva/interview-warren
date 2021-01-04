import { AccountModel } from '@/domain/models/account/Account'

export interface DoPaymentModel {
  accountOrigin: number
  code: number
  createdDate: Date
  sendDate: Date
  value: number
}

export interface DoPayment {
  payment: (payment: DoPaymentModel) => Promise<AccountModel>
}
