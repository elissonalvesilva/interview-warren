import { badRequest, serverError, successResponse } from '@/presentation/helpers/http-helper'
import { HttpResponse, Controller, AccountValidator } from '@/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/erros'

export class PaymentController implements Controller {
  constructor (
    private readonly accountValidator: AccountValidator) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'accountOrigin',
        'code',
        'createdDate',
        'sendDate',
        'value'
      ]
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { accountOrigin, value } = request.body

      if (typeof value !== 'number') {
        return badRequest(new InvalidParamError('value'))
      }

      const isValidAccountOrigin = await this.accountValidator.isValid(accountOrigin)

      if (!isValidAccountOrigin) {
        return badRequest(new InvalidParamError('accountOrigin'))
      }

      const payment = {}

      return successResponse(payment)
    } catch (error) {
      return serverError(error)
    }
  }
}
