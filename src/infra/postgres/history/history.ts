import { Repository, getRepository } from 'typeorm'
import { History } from '@/infra/postgres/history/entities/History'
import { HistoryRepository } from '@/data/protocols/history-repository'

export class AddHistoryDatabaseRepository implements HistoryRepository {
  private readonly ormHistoryRepository: Repository<History>

  constructor () {
    this.ormHistoryRepository = getRepository(History)
  }

  async add (history: any): Promise<any> {
    try {
      await this.ormHistoryRepository.save({
        ...history,
        account: {
          id: history.account.id
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
