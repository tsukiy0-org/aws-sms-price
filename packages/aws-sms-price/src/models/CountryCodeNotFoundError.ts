export class CountryCodeNotFoundError extends Error {
  constructor(countryCode: string) {
    super(`Country code ${countryCode} not found`);
  }
}
