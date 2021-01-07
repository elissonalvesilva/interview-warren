import { AccountModel } from '@/domain/models/account/Account'

export interface HistoryModel {
  id?: string
  createdAt?: Date
  type: 'withdraw' | 'deposit' | 'payment'
  /**
   * 0 - output
   * 1 - input
   */
  movimentationType: 0 | 1
  lastBalance: number
  actualBalance: number
  updatedAt?: Date
  account?: AccountModel
}
