import { makeAccountValidator } from '@/main/factories/account-validator'
import { Controller } from '@/presentation/protocols/controller'
import { StatementController } from '@/presentation/controllers/Statement/Statement'
import { makeDoStatement } from '@/main/factories/do-statement'

export const makeStatementController = (): Controller => {
  return new StatementController(makeAccountValidator(), makeDoStatement())
}
