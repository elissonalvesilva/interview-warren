export interface AccountValidatorRepository {
  isValid: (accountNumber: Number) => Promise<boolean>
}
