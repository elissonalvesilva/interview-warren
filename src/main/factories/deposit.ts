import { makeDepositHistoryDecorator } from '@/main/factories/decorators/deposit-history-controller-decorator-factory'
import { makeDoDeposit } from '@/main/factories/do-deposit'
import { makeAccountValidator } from '@/main/factories/account-validator'
import { DepositController } from '@/presentation/controllers/deposit/deposit'
import { Controller } from '@/presentation/protocols/controller'
export const makeDepositController = (): Controller => {
  const type = 'deposit'
  const controller = new DepositController(makeAccountValidator(), makeDoDeposit())
  return makeDepositHistoryDecorator(controller, type)
}
