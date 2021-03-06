import countries from "i18n-iso-countries";
import { AwsPrice, AwsPriceList } from "./AwsPriceList";
import { CountryCode } from "./CountryCode";

export type Price = {
  country: string;
  countryCode: CountryCode;
} & AwsPrice;

export const toPriceList = (awsPriceList: AwsPriceList): readonly Price[] => {
  return Object.entries(awsPriceList).reduce((acc, [key, value]) => {
    const rows = value.map((_) => ({
      countryCode: key,
      country: countries.getName(key, "en"),
      ..._,
    }));

    return [...acc, ...rows];
  }, [] as readonly Price[]);
};
