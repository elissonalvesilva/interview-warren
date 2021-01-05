import { AccountModel } from '@/domain/models/account/Account'

export interface DoStatementModel {
  accountOrigin: number
}

export interface DoStatement {
  statement: (statement: DoStatementModel) => Promise<AccountModel>
}
