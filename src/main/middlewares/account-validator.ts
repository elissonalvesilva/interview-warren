import { makeAccountValidatorMiddleware } from '@/main/factories/middlewares/account-validator'
import { adaptMiddleware } from '@/main/adapter/express-middleware-adapter'

export const validAccount = adaptMiddleware(makeAccountValidatorMiddleware())
