import { isProd, isTest } from './constants'
import * as dotenv from 'dotenv'

export const loadEnv = (): object => {
  const loadFile = (env = 'production'): string => {
    if (env === isProd) return '.env'
    if (env === isTest) return '.env.test'
    return '.env.dev'
  }

  return dotenv.config({ path: loadFile(process.env.NODE_ENV) })
}
