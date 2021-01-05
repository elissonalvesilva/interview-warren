import { Repository, getRepository } from 'typeorm'
import { AccountModel } from '@/domain/models/account/Account'
import { Account } from '@/infra/postgres/account/entities/Account'
import { DoStatementRepository } from '@/data/protocols/do-statement-repository'
import { DoStatementModel } from '@/domain/usecases/statement/DoStatement'

export class DoStatementDatabaseRepository implements DoStatementRepository {
  private readonly ormRepository: Repository<Account>

  constructor () {
    this.ormRepository = getRepository(Account)
  }

  async statement (statement: DoStatementModel): Promise<AccountModel> {
    const statementResponse = await this.ormRepository.findOne({
      where: {
        accountNumber: statement.accountOrigin
      }
    })
    return statementResponse
  }
}
