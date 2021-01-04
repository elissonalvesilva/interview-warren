import { createConnections, getConnection } from 'typeorm'

import ormConfig from '../../ormconfig'

process.env.NODE_ENV = 'production'

require('ts-node/register')
// tslint:disable-next-line: no-var-requires
require('tsconfig-paths/register')

export default async (): Promise<void> => {
  const t0 = Date.now()
  await createConnections(ormConfig)
  const connection = await getConnection('default')
  const connectTime = Date.now()
  await connection.runMigrations()
  const migrationTime = Date.now()
  console.log(
    ` 👩‍🔬 Connected in ${connectTime -
      t0}ms - Executed migrations in ${migrationTime - connectTime}ms.`
  )
}
