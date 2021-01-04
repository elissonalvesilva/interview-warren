import { badRequest, serverError, successResponse } from '@/presentation/helpers/http-helper'
import { HttpResponse, Controller, AccountValidator } from '@/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/erros'
import { DoWithdraw } from '@/domain/usecases/withdraw/DoWithdraw'

export class WithdrawController implements Controller {
  constructor (
    private readonly accountValidator: AccountValidator,
    private readonly doWithdraw: DoWithdraw) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'accountOrigin',
        'createdDate',
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

      const withdraw = await this.doWithdraw.withdraw(request.body)

      return successResponse(withdraw)
    } catch (error) {
      return serverError(error)
    }
  }
}
