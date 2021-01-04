import { adaptRoute } from '@/main/adapter/express-routes-adapter'
import { Router } from 'express'
import { makeWithdrawController } from '@/main/factories/withdraw'

export default (router: Router): void => {
  router.post('/payment', adaptRoute(makeWithdrawController()))
}
