import { adaptRoute } from '@/main/adapter/express-routes-adapter'
import { Router } from 'express'
import { makePaymentController } from '@/main/factories/payment'

export default (router: Router): void => {
  router.post('/payment', adaptRoute(makePaymentController()))
}
