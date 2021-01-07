import { Router } from 'express'
import { validAccount } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapter/express-routes-adapter'
import { makeWithdrawController } from '@/main/factories/withdraw'

export default (router: Router): void => {
  router.post('/withdraw', validAccount, adaptRoute(makeWithdrawController()))
}
