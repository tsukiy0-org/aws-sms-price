import { CountryCode } from "./CountryCode";

export type AwsPrice = {
  mcc: string;
  mnc: string;
  name: string;
  transPrice: number;
  promoPrice: number;
  transDeliverability: number;
  promoDeliverability: number;
};

export type AwsPriceList = Record<CountryCode, readonly AwsPrice[]>;
