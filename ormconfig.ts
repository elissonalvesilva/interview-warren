import { ConnectionOptions } from 'typeorm'
import { loadEnv } from './src/utils/load-env'

loadEnv()

const DATABASE_TYPE = 'postgres'
const DATABASE_ENTITIES = ['./src/infra/postgres/**/entities/**.ts']
const MIGRATIONS_DIR = './src/database/migrations/'
const MIGRATIONS = [`${MIGRATIONS_DIR}/*.ts`]

const connectionOptions: ConnectionOptions[] = [
  {
    name: 'default',
    type: DATABASE_TYPE,
    database: String(process.env.DATABASE_DATABASE),
    host: String(process.env.DATABASE_HOST),
    port: Number(process.env.DATABASE_PORT),
    username: String(process.env.DATABASE_USERNAME),
    password: String(process.env.DATABASE_PASSWORD),
    entities: DATABASE_ENTITIES,
    migrations: MIGRATIONS,
    synchronize: false,
    logging: false,
    cli: {
      migrationsDir: MIGRATIONS_DIR
    }
  },
  {
    name: 'test',
    type: DATABASE_TYPE,
    database: String(process.env.DATABASE_DATABASE),
    host: String(process.env.DATABASE_HOST),
    port: Number(process.env.DATABASE_PORT),
    username: String(process.env.DATABASE_USERNAME),
    password: String(process.env.DATABASE_PASSWORD),
    entities: DATABASE_ENTITIES,
    migrations: MIGRATIONS,
    synchronize: false,
    dropSchema: true,
    logging: false,
    cli: {
      migrationsDir: MIGRATIONS_DIR
    }
  }
]

export = connectionOptions
