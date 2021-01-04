import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'

beforeAll(async () => {
  await PostgresHelper.connect()
})

afterAll(async () => {
  await PostgresHelper.disconnect()
})
