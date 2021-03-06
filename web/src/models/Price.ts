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

export type PriceListFilter = (input: Price[]) => Price[];

export type Direction = 1 | 0 | -1;

export const filterBySearch: (search: string) => PriceListFilter = (search) => (
  input,
) => {
  return input.filter((_) =>
    _.country.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
};

export const sortByCountry: (direction: Direction) => PriceListFilter = (
  direction,
) => (input) => {
  return input.sort((a, b) => {
    if (a.country < b.country) {
      return direction * -1;
    }

    if (a.country > b.country) {
      return direction * 1;
    }

    return 0;
  });
};

export const sortByPromoPrice: (direction: Direction) => PriceListFilter = (
  direction,
) => (input) => {
  return input.sort((a, b) => {
    if (a.promoPrice < b.promoPrice) {
      return direction * -1;
    }

    if (a.promoPrice > b.promoPrice) {
      return direction * 1;
    }

    return 0;
  });
};

export const sortByTxPrice: (direction: Direction) => PriceListFilter = (
  direction,
) => (input) => {
  return input.sort((a, b) => {
    if (a.transPrice < b.transPrice) {
      return direction * -1;
    }

    if (a.transPrice > b.transPrice) {
      return direction * 1;
    }

    return 0;
  });
};
