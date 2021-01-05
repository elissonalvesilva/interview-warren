import { adaptRoute } from '@/main/adapter/express-routes-adapter'
import { Router } from 'express'
import { makeStatementController } from '@/main/factories/statement'

export default (router: Router): void => {
  router.post('/payment', adaptRoute(makeStatementController()))
}
