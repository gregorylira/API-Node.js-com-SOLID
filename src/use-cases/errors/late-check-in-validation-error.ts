export class LateCheckInValidationError extends Error {
  constructor() {
    super('The check-in is too old to be validated')
    this.name = 'LateCheckInValidationError'
  }
}
