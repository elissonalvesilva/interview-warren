import { DoPaymentDatabaseRepository } from '@/infra/postgres/payment/payment'
import { DoPayment } from '@/domain/usecases/payment/DoPayment'

export const makeDoPayment = (): DoPayment => {
  return new DoPaymentDatabaseRepository()
}
