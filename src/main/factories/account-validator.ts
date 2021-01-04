import { AccountValidatorDatabaseRepository } from '@/infra/postgres/account/account-validator-repository/account'
import { AccountValidator } from '@/presentation/protocols'
export const makeAccountValidator = (): AccountValidator => {
  return new AccountValidatorDatabaseRepository()
}
