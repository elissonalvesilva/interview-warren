import { HistoryRepository } from '@/data/protocols/history-repository'
import { AccountBalanceRepository } from '@/data/protocols/account-balance-repository'
import { HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { INPUT_MOVIMENTATION, OUTPUT_MOVIMENTATION } from '@/utils/constants'

export class DepositHistoryControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly historyRepository: HistoryRepository,
    private readonly accountBalanceRepository: AccountBalanceRepository,
    private readonly type: string
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const accountOriginBalance = await this.accountBalanceRepository.getBalance(request.accountOrigin)
    const accountDestinationBalance = await this.accountBalanceRepository.getBalance(request.accountDestination)

    const httpResponse = await this.controller.handle(request)

    if (httpResponse.statusCode <= 200) {
      const { body } = httpResponse

      const { accountOrigin, accountDestination } = body

      const historyObjectOrigin = {
        lastBalance: accountOriginBalance,
        type: this.type,
        movimentationType: OUTPUT_MOVIMENTATION,
        actualBalance: accountOrigin.balance,
        account: accountOrigin
      }

      const historyObjectDestination = {
        lastBalance: accountDestinationBalance,
        type: this.type,
        movimentationType: INPUT_MOVIMENTATION,
        actualBalance: accountDestination.balance,
        account: accountDestination
      }

      await this.historyRepository.add(historyObjectOrigin)
      await this.historyRepository.add(historyObjectDestination)
    }

    return httpResponse
  }
}
