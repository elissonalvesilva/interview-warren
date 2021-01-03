import { isProd, isTest } from './constants'
import * as dotenv from 'dotenv'

export const loadEnv = (): object => {
  const loadFile = (): string => {
    if (isProd) return '.env'
    if (isTest) return '.env.test'
    return '.env.dev'
  }

  return dotenv.config({ path: loadFile() })
}
