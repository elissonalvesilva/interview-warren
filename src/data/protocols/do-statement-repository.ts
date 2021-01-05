import { AccountModel } from '@/domain/models/account/Account'
import { DoStatementModel } from '@/domain/usecases/statement/DoStatement'

export interface DoStatementRepository {
  statement: (statement: DoStatementModel) => Promise<AccountModel>
}
