import { AccountModel } from '@/domain/models/account/Account'

export interface DoStatementModel {
  accountOrigin: number
  statementDate?: Date
}

export interface DoStatement {
  statement: (statement: DoStatementModel) => Promise<AccountModel>
}
