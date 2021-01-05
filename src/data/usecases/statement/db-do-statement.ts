import { DoStatementRepository } from './../../protocols/do-statement-repository'
import { AccountModel } from '@/domain/models/account/Account'
import { DoStatementModel } from '@/domain/usecases/statement/DoStatement'

export class DbDoStatement implements DoStatementRepository {
  constructor (private readonly doStatementRepository: DoStatementRepository) {}
  async statement (statement: DoStatementModel): Promise<AccountModel> {
    const statementResponse = await this.doStatementRepository.statement(statement)
    return statementResponse
  }
}
