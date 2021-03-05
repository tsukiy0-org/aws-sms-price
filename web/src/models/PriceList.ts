export type Price = {
  mcc: string;
  mnc: string;
  name: string;
  transPrice: number;
  promoPrice: number;
  transDeliverability: number;
  promoDeliverability: number;
};

export type CountryCode = string;

export type PriceList = Record<CountryCode, readonly Price[]>;
