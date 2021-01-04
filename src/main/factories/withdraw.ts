import { makeAccountValidator } from '@/main/factories/account-validator'
import { Controller } from '@/presentation/protocols/controller'
import { WithdrawController } from '@/presentation/controllers/withdraw/withdraw'
import { makeDoWithdraw } from '@/main/factories/do-withdraw'

export const makeWithdrawController = (): Controller => {
  return new WithdrawController(makeAccountValidator(), makeDoWithdraw())
}
