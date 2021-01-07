import { DepositHistoryControllerDecorator } from '@/main/decorators/deposit-history-controller-decorator'
import { AccountBalanceDatabaseRepository } from '@/infra/postgres/account/account-balance-repository/account'
import { AddHistoryDatabaseRepository } from '@/infra/postgres/history/history'
import { Controller } from '@/presentation/protocols/controller'

export const makeDepositHistoryDecorator = (controller: Controller, type: string): Controller => {
  const historyRepository = new AddHistoryDatabaseRepository()
  const accountRepository = new AccountBalanceDatabaseRepository()

  return new DepositHistoryControllerDecorator(controller, historyRepository, accountRepository, type)
}
