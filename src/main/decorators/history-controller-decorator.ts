import { HistoryRepository } from '@/data/protocols/history-repository'
import { AccountBalanceRepository } from '@/data/protocols/account-balance-repository'
import { HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'

export class HistoryControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly historyRepository: HistoryRepository,
    private readonly accountBalanceRepository: AccountBalanceRepository,
    private readonly type: string,
    private readonly movimentationType: number
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const lastBalance = await this.accountBalanceRepository.getBalance(request.accountOrigin)
    const httpResponse = await this.controller.handle(request)

    if (httpResponse.statusCode <= 200) {
      const { body } = httpResponse
      const { id, balance } = body
      const accountObject = {
        id
      }

      const historyObject = {
        lastBalance,
        type: this.type,
        movimentationType: this.movimentationType,
        actualBalance: balance,
        account: accountObject
      }

      await this.historyRepository.add(historyObject)
    }

    return httpResponse
  }
}
