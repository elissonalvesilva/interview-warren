import { DoPaymentRepository } from '@/data/protocols/do-payment-repository'
import { AccountModel } from '@/domain/models/account/Account'
import { DoPaymentModel } from '@/domain/usecases/payment/DoPayment'

export class DbDoPayment implements DoPaymentRepository {
  constructor (private readonly doPaymentRepository: DoPaymentRepository) {}
  async payment (payment: DoPaymentModel): Promise<AccountModel> {
    const paymentResponse = await this.doPaymentRepository.payment(payment)
    return paymentResponse
  }
}
