import { AccountValidatorRepository } from '@/data/protocols/account-validator-repository'
import { AccountValidator } from '@/domain/usecases/account/account-validator'

export class DbAccountValidator implements AccountValidator {
  constructor (private readonly accountValidatorRepository: AccountValidatorRepository) {}

  async isValid (accountNumber: Number): Promise<boolean> {
    const isValidAccount = await this.accountValidatorRepository.isValid(accountNumber)
    return isValidAccount
  }
}
