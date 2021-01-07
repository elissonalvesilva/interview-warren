export interface HistoryRepository {
  add: (history: any) => Promise<void>
}
