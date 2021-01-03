import { AccountValidatorRepository } from '@/data/protocols/account-validator-repository'

export class AccountValidatorDatabaseRepository implements AccountValidatorRepository {
  async isValid (accountNumber: Number): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}
