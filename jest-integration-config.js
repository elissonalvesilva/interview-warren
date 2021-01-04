const config = require('./jest.config')

config.testMatch = ['**/*.test.ts']
config.setupFilesAfterEnv = ['./src/utils/setup-test-integration.ts']

module.exports = config
