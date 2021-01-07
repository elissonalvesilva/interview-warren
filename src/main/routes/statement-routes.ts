import { Router } from 'express'
import { validAccount } from './../middlewares/account-validator'
import { adaptRoute } from '@/main/adapter/express-routes-adapter'
import { makeStatementController } from '@/main/factories/statement'

export default (router: Router): void => {
  router.post('/statement', validAccount, adaptRoute(makeStatementController()))
}
