import { adaptRoute } from '@/main/adapter/express-routes-adapter'
import { Router } from 'express'
import { makeDepositController } from '@/main/factories/deposit'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeDepositController()))
}
