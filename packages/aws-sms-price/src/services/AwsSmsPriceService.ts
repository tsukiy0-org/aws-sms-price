import {
  AwsPrice,
  AwsPriceList,
  CountryCode,
  CountryCodeNotFoundError,
} from "../models";
import data from "./data.json";

export class AwsSmsPriceService {
  private readonly db: AwsPriceList = (data as any).SMS.countryPrices;

  hasCountry = (countryCode: CountryCode): boolean => {
    const countryCodes = Object.keys(this.db);
    const found = countryCodes.find((_) => _ === countryCode);
    return Boolean(found);
  };

  listCountryCodes = (): CountryCode[] => {
    return Object.keys(this.db);
  };

  getCountryTransactionalPrices = (countryCode: CountryCode): AwsPrice[] => {
    if (!this.hasCountry(countryCode)) {
      throw new CountryCodeNotFoundError(countryCode);
    }

    return this.db[countryCode].transactional;
  };

  getCountryPromotionalPrices = (countryCode: CountryCode): AwsPrice[] => {
    if (!this.hasCountry(countryCode)) {
      throw new CountryCodeNotFoundError(countryCode);
    }

    return this.db[countryCode].transactional;
  };
}
