import { AccountValidatorRepository } from '@/data/protocols/account-validator-repository'

export class DbAccountValidator implements AccountValidatorRepository {
  constructor (private readonly accountValidatorRepository: AccountValidatorRepository) {}

  async isValid (accountNumber: Number): Promise<boolean> {
    const isValidAccount = await this.accountValidatorRepository.isValid(accountNumber)
    return isValidAccount
  }
}
