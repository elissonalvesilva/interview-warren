import { DoWithdrawDatabaseRepository } from '@/infra/postgres/withdraw/withdraw'
import { DoWithdraw } from '@/domain/usecases/withdraw/DoWithdraw'

export const makeDoWithdraw = (): DoWithdraw => {
  return new DoWithdrawDatabaseRepository()
}
