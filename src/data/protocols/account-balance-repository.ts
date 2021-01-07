export interface AccountBalanceRepository {
  getBalance: (accountNumber: Number) => Promise<number>
}
