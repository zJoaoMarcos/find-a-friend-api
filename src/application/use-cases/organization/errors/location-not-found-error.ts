export class LocationNotFoundError extends Error {
  constructor() {
    super('Location not found.')
  }
}
