import { makeAccountValidator } from '@/main/factories/account-validator'
import { AccountValidatorMiddleware } from '@/presentation/middlewares/account-validator'
import { Middleware } from '@/presentation/protocols/middleware'

export const makeAccountValidatorMiddleware = (): Middleware => {
  return new AccountValidatorMiddleware(makeAccountValidator())
}
