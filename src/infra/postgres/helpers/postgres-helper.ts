import { Connection, createConnection, getConnection } from 'typeorm'

export const PostgresHelper = {
  connectionName: null as string,
  async connect (connectionName: string = 'default'): Promise<Connection> {
    this.connectionName = connectionName
    const connections = await createConnection(connectionName)
    return connections
  },

  async disconnect (): Promise<void> {
    const connection = getConnection(this.connectionName)
    await connection.close()
  }
}
