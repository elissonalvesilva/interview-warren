import { makeHistoryDecorator } from '@/main/factories/decorators/history-controller-decorator-factory'
import { makeDoPayment } from '@/main/factories/do-payment'
import { makeAccountValidator } from '@/main/factories/account-validator'
import { Controller } from '@/presentation/protocols/controller'
import { PaymentController } from '@/presentation/controllers/payment/payment'
import { OUTPUT_MOVIMENTATION } from '@/utils/constants'

export const makePaymentController = (): Controller => {
  const type = 'payment'
  const movimentationType = OUTPUT_MOVIMENTATION
  const controller = new PaymentController(makeAccountValidator(), makeDoPayment())
  return makeHistoryDecorator(controller, type, movimentationType)
}
