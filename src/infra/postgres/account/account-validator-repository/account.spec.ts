// import { PostgresHelper } from '@/infra/postgres/helpers/postgres-helper'
// import { ConnectionOptions } from 'typeorm'
// import { AccountValidatorDatabaseRepository } from '@/infra/postgres/account/account-validator-repository/account'

// const makeSut = (): AccountValidatorDatabaseRepository => {
//   return new AccountValidatorDatabaseRepository()
// }

// describe('Account Validator Repository', () => {
//   beforeAll(async () => {
//     const obj: ConnectionOptions = {
//       type: 'sqlite',
//       database: ':memory:'
//     }

//     await PostgresHelper.connect(obj)
//   })

//   afterAll(async () => {
//     await PostgresHelper.disconnect()
//   })

//   // it('Should return true if exist a account', async () => {
//   //   const sut = makeSut()

//   //   const isValid = await sut.isValid(123)

//   //   console.log(isValid)
//   // })
// })

describe('Account Validator Repository', () => {
  it('Should be truthy', () => {
    expect(true).toBe(true)
  })
})
