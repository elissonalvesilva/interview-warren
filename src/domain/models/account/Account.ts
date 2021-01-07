import { HistoryModel } from '@/domain/models/history/History'
export interface AccountModel {
  id?: string
  accountNumber: number
  type?: number
  lastBalance?: number
  balance: number
  createdAt?: Date
  updatedAt?: Date
  histories?: HistoryModel[]
}
