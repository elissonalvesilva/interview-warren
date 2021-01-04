import { DoWithdrawModel } from '@/domain/usecases/withdraw/DoWithdraw'
import { DoWithdrawRepository } from '@/data/protocols/do-withdraw-repository'
import { AccountModel } from '@/domain/models/account/Account'

export class DbDoWithdraw implements DoWithdrawRepository {
  constructor (private readonly doPaymentRepository: DoWithdrawRepository) {}
  async withdraw (withdraw: DoWithdrawModel): Promise<AccountModel> {
    const paymentResponse = await this.doPaymentRepository.withdraw(withdraw)
    return paymentResponse
  }
}
