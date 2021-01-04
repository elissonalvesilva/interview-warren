import { DbDoPayment } from '@/data/usecases/payment/db-do-payment'
import { DoPaymentRepository } from '@/data/protocols/do-payment-repository'
import { AccountModel } from '@/domain/models/account/Account'
import { DoPaymentModel } from '@/domain/usecases/payment/DoPayment'

const makeFakeAccount = (): AccountModel => {
  return {
    id: '1',
    accountNumber: 2,
    type: 1,
    balance: 2,
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2020-01-01')
  }
}

const makeFakePaymentAccount = (): DoPaymentModel => {
  return {
    accountOrigin: 1,
    code: 2,
    createdDate: new Date('2020-01-01'),
    sendDate: new Date('2020-01-01'),
    value: 100
  }
}

const makeDoPaymentRepository = (): DoPaymentRepository => {
  class DoPaymentRepositoryStub implements DoPaymentRepository {
    async payment (payment: DoPaymentModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new DoPaymentRepositoryStub()
}

interface SutTypes {
  sut: DbDoPayment
  doPaymentRepositoryStub: DoPaymentRepository
}

const makeSut = (): SutTypes => {
  const doPaymentRepositoryStub = makeDoPaymentRepository()
  const sut = new DbDoPayment(doPaymentRepositoryStub)

  return { sut, doPaymentRepositoryStub }
}

describe('DB Do Payment Use Case', () => {
  it('Should call DoPaymentRepository with correct values ', async () => {
    const { sut, doPaymentRepositoryStub } = makeSut()
    const spyRepository = jest.spyOn(doPaymentRepositoryStub, 'payment')
    await sut.payment(makeFakePaymentAccount())

    expect(spyRepository).toHaveBeenCalledWith(makeFakePaymentAccount())
  })

  it('Should throws if DoPayementRepository throws', async () => {
    const { sut, doPaymentRepositoryStub } = makeSut()
    jest.spyOn(doPaymentRepositoryStub, 'payment')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.payment(makeFakePaymentAccount())
    await expect(promise).rejects.toThrow()
  })
})
