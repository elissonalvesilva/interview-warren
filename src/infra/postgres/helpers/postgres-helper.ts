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
  },

  async clear (): Promise<void> {
    const connection = getConnection()
    const entities = connection.entityMetadatas

    await Promise.all(
      entities.map(async (entity) => {
        const repository = connection.getRepository(entity.name)
        await repository.query(`DELETE FROM ${entity.tableName}`)
      })
    )
  }
}
