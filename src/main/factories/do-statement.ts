import { DoStatementDatabaseRepository } from '@/infra/postgres/statement/statement'
import { DoStatement } from '@/domain/usecases/statement/DoStatement'

export const makeDoStatement = (): DoStatement => {
  return new DoStatementDatabaseRepository()
}
