import { DoDeposit } from '@/domain/usecases/deposit/DoDeposit'
import { DoDepositDatabaseRepository } from '@/infra/postgres/deposit/deposit'

export const makeDoDeposit = (): DoDeposit => {
  return new DoDepositDatabaseRepository()
}
