import { DoPaymentModel } from '@/domain/usecases/payment/DoPayment'
import { AccountModel } from '@/domain/models/account/Account'

export interface DoPaymentRepository {
  payment: (payment: DoPaymentModel) => Promise<AccountModel>
}
