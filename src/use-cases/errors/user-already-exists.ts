export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists')
    this.name = 'UserAlreadyExistsError'
  }
}