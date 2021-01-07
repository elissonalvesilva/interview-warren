import { InvalidAccountError } from '@/presentation/erros/invalid-account-error'
import { Middleware, HttpResponse, AccountValidator } from '@/presentation/protocols'
import { successResponse, serverError, badRequest } from '@/presentation/helpers/http-helper'

export class AccountValidatorMiddleware implements Middleware {
  constructor (
    private readonly accountValidator: AccountValidator
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const { body } = request
      if (body.accountOrigin || body.accountDestination) {
        if (body.accountOrigin) {
          const isValid = await this.accountValidator.isValid(body.accountOrigin)
          if (isValid) {
            return successResponse({ ok: 'ok' })
          }
        } else {
          const isValid = await this.accountValidator.isValid(body.accountDestination)
          if (isValid) {
            return successResponse({ ok: 'ok' })
          }
        }
      }
      return badRequest(new InvalidAccountError())
    } catch (error) {
      return serverError(error)
    }
  }
}
