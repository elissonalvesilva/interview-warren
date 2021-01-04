import { makeDoDeposit } from '@/main/factories/do-deposit'
import { makeAccountValidator } from '@/main/factories/account-validator'
import { DepositController } from '@/presentation/controllers/deposit/deposit'
import { Controller } from '@/presentation/protocols/controller'
export const makeDepositController = (): Controller => {
  return new DepositController(makeAccountValidator(), makeDoDeposit())
}
