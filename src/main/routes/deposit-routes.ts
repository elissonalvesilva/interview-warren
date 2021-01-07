import { adaptRoute } from '@/main/adapter/express-routes-adapter'
import { Router } from 'express'
import { makeDepositController } from '@/main/factories/deposit'
import { validAccount } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/deposit', validAccount, adaptRoute(makeDepositController()))
}
