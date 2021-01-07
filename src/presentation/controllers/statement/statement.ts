import { badRequest, serverError, successResponse } from '@/presentation/helpers/http-helper'
import { HttpResponse, Controller, AccountValidator } from '@/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/erros'
import { DoStatement } from '@/domain/usecases/statement/DoStatement'

export class StatementController implements Controller {
  constructor (
    private readonly accountValidator: AccountValidator,
    private readonly doStatement: DoStatement) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'accountOrigin'
      ]
      for (const field of requiredFields) {
        if (!request[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { accountOrigin } = request
      const isValidAccountOrigin = await this.accountValidator.isValid(accountOrigin)

      if (!isValidAccountOrigin) {
        return badRequest(new InvalidParamError('accountOrigin'))
      }

      const statement = await this.doStatement.statement(request)

      return successResponse(statement)
    } catch (error) {
      return serverError(error)
    }
  }
}
