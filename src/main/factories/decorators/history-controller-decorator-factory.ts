import { HistoryControllerDecorator } from '@/main/decorators/history-controller-decorator'
import { AccountBalanceDatabaseRepository } from '@/infra/postgres/account/account-balance-repository/account'
import { AddHistoryDatabaseRepository } from '@/infra/postgres/history/history'
import { Controller } from '@/presentation/protocols/controller'

export const makeHistoryDecorator = (controller: Controller, type: string, movimentationType: number): Controller => {
  const historyRepository = new AddHistoryDatabaseRepository()
  const accountRepository = new AccountBalanceDatabaseRepository()

  return new HistoryControllerDecorator(controller, historyRepository, accountRepository, type, movimentationType)
}
