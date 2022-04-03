import { AwsPriceList, CountryCode } from "../models";
import data from "./data.json";

export class AwsSmsPriceService {
  private readonly db: AwsPriceList = (data as any).SMS.countryPrices;

  hasCountry = (countryCode: CountryCode): boolean => {
    const countryCodes = Object.keys(this.db);
    const found = countryCodes.find((_) => _ === countryCode);
    return Boolean(found);
  };
}
