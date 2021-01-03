export interface AccountValidator {
  isValid: (accountNumber: Number) => Promise<boolean>
}
