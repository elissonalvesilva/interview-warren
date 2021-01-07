import { DoDeposit } from '@/domain/usecases/deposit/DoDeposit'
import { badRequest, serverError, successResponse } from '@/presentation/helpers/http-helper'
import { HttpResponse, Controller, AccountValidator } from '@/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/erros'

export class DepositController implements Controller {
  constructor (
    private readonly accountValidator: AccountValidator,
    private readonly doDeposit: DoDeposit) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'accountOrigin',
        'accountDestination',
        'createdDate',
        'sendDate',
        'value'
      ]
      for (const field of requiredFields) {
        if (!request[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { accountOrigin, accountDestination, value } = request
      if (typeof accountOrigin !== 'number' || typeof accountDestination !== 'number') {
        return badRequest(new InvalidParamError('accountOrigin and accountDestination must to be a number'))
      }

      if (typeof value !== 'number') {
        return badRequest(new InvalidParamError('value'))
      }

      const isValidAccountDestination = await this.accountValidator.isValid(accountDestination)
      if (!isValidAccountDestination) {
        return badRequest(new InvalidParamError('accountDestination'))
      }

      const isValidAccountOrigin = await this.accountValidator.isValid(accountOrigin)

      if (!isValidAccountOrigin) {
        return badRequest(new InvalidParamError('accountOrigin'))
      }

      const deposit = await this.doDeposit.deposit(request)

      return successResponse(deposit)
    } catch (error) {
      return serverError(error)
    }
  }
}
