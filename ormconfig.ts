import { ConnectionOptions } from 'typeorm'
import { loadEnv } from './src/utils/load-env'

loadEnv()

const DATABASE_TYPE = 'postgres'
const DATABASE_ENTITIES = ['src/infra/postgres/**/models/**.ts']

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
    synchronize: true,
    // dropSchema: true,
    logging: true
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
    synchronize: true,
    dropSchema: true,
    logging: false
  }
]

export = connectionOptions
