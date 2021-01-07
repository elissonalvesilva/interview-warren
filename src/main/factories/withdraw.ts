import { makeHistoryDecorator } from '@/main/factories/decorators/history-controller-decorator-factory'
import { makeAccountValidator } from '@/main/factories/account-validator'
import { Controller } from '@/presentation/protocols/controller'
import { WithdrawController } from '@/presentation/controllers/withdraw/withdraw'
import { makeDoWithdraw } from '@/main/factories/do-withdraw'
import { OUTPUT_MOVIMENTATION } from '@/utils/constants'

export const makeWithdrawController = (): Controller => {
  const type = 'withdraw'
  const movimentationType = OUTPUT_MOVIMENTATION
  const controller = new WithdrawController(makeAccountValidator(), makeDoWithdraw())
  return makeHistoryDecorator(controller, type, movimentationType)
}
