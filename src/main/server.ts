import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'

PostgresHelper
  .connect()
  .then(async () => {
    const app = (await import('./config/app')).default

    app.listen(process.env.port, () => console.log(`Server running at: ${process.env.port}`))
  })
  .catch(console.error)
