export const ServiceResponse = class {
  constructor({ data, message, status }) {
    this.data = data
    this.message = message
    this.status = status
  }
}
