import { adaptRoute } from '@/main/adapter/express-routes-adapter'
import { Router } from 'express'
import { makePaymentController } from '@/main/factories/payment'
import { validAccount } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/payment', validAccount, adaptRoute(makePaymentController()))
}
