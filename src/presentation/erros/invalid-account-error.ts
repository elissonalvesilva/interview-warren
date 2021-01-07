export class InvalidAccountError extends Error {
  constructor () {
    super('Invalid Account Error')
    this.name = 'AccountError'
  }
}
