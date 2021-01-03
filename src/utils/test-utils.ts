// This file is executed once in the worker before executing each test file. We

import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'

// wait for the database connection and make sure to close it afterwards.

process.env.NODE_ENV = 'test'

beforeAll(async () => {
  const t0 = Date.now()
  const connection = await PostgresHelper.connect('test')
  const connectTime = Date.now()
  await connection.runMigrations()
  const migrationTime = Date.now()
  console.log(
    ` 👩‍🔬 Connected in ${connectTime - t0}ms - Executed migrations in ${
      migrationTime - connectTime
    }ms.`
  )
})
afterAll(async () => {
  await PostgresHelper.disconnect()
})
