import { CustomerFactory } from '@/database/seeders/factories/customer-factory'
import { CustomerSeed, AccountSeed } from '@/database/seeders/fakes/customers'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
CustomerFactory.create(CustomerSeed, AccountSeed)
