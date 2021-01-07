import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'

PostgresHelper
  .connect()
  .then(async () => {
    const app = (await import('./config/app')).default

    app.listen(process.env.APP_PORT, () => console.log(`Server running at: ${process.env.APP_PORT}`))
  })
  .catch(console.error)
