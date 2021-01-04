import { makeDoPayment } from '@/main/factories/do-payment'
import { makeAccountValidator } from '@/main/factories/account-validator'
import { Controller } from '@/presentation/protocols/controller'
import { PaymentController } from '@/presentation/controllers/payment/payment'

export const makePaymentController = (): Controller => {
  return new PaymentController(makeAccountValidator(), makeDoPayment())
}
