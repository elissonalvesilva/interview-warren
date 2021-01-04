import { DbAccountValidator } from '@/data/usecases/db-account-validator'
import { AccountValidatorRepository } from '@/data/protocols/account-validator-repository'

const makeAccountValidatorRepository = (): AccountValidatorRepository => {
  class AccountValidatorRepositoryStub implements AccountValidatorRepository {
    async isValid (accountNumber: Number): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }

  return new AccountValidatorRepositoryStub()
}

interface SutTypes {
  sut: DbAccountValidator
  accountValidatorRepository: AccountValidatorRepository
}

const makeSut = (): SutTypes => {
  const accountValidatorRepository = makeAccountValidatorRepository()
  const sut = new DbAccountValidator(accountValidatorRepository)
  return {
    sut,
    accountValidatorRepository
  }
}

describe('DB Account Validator Use Case', () => {
  it('Should call AccountValidatorRepository with correct values ', async () => {
    const { sut, accountValidatorRepository } = makeSut()
    const spyRepository = jest.spyOn(accountValidatorRepository, 'isValid')
    await sut.isValid(123)

    expect(spyRepository).toHaveBeenCalledWith(123)
  })

  it('Should throws if AccountValidatorRepository throws', async () => {
    const { sut, accountValidatorRepository } = makeSut()
    jest.spyOn(accountValidatorRepository, 'isValid')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.isValid(123)
    await expect(promise).rejects.toThrow()
  })

  it('Should return a boolean on success', async () => {
    const { sut } = makeSut()
    const accountResponse = await sut.isValid(123)
    expect(accountResponse).toEqual(true)
  })
})
