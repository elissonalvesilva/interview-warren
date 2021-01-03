import { createConnection } from 'typeorm'

export const PostgresHelper = {
  client: null,
  connectionOptions: null as string,
  async connect (connectionName: string) {
    this.connectionOptions = connectionName || 'default'
    const connections = await createConnection(connectionName)
    this.client = connections
    return connections
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  }
}
