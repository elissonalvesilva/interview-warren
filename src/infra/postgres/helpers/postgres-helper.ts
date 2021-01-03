import { ConnectionManager } from 'typeorm'

import { ConnectionOptions as ConnOptions } from '@/infra/typeorm/models/ConnectionOptions'

export const PostgresHelper = {
  client: null,
  connectionOptions: null as ConnOptions,
  async connect (connectionOptions: ConnOptions): Promise<void> {
    this.connectionOptions = connectionOptions
    const connectionManager = new ConnectionManager()
    this.client = await connectionManager.create(connectionOptions).connect()
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  }

  // async getTableRepository (name: string): Promise<> {
  //   if (!this.client?.isConnected()) {
  //     await this.connect(this.uri)
  //   }
  //   return this.client.db().collection(name)
  // },
}
