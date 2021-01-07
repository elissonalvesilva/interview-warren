import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'
export const CustomerFactory = {
  create: async (customers, accounts) => {
    const connection = await PostgresHelper.connect('default')
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    const promises1 = customers.map((customer) => {
      return connection.createQueryBuilder().insert().into('customer').values(customer).execute()
    })
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    const promises2 = accounts.map((account) => {
      return connection.createQueryBuilder().insert().into('account').values(account).execute()
    })
    await Promise.all(promises1)
    await Promise.all(promises2)
  }
}
