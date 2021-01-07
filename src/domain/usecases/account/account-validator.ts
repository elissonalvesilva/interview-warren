export interface AccountValidator {
  isValid: (accountNumber: number) => Promise<boolean>
}
