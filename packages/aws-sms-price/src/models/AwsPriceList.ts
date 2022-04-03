import { AwsPrice } from "./AwsPrice";
import { CountryCode } from "./CountryCode";

export type AwsPriceList = {
  [key in CountryCode]: {
    transactional: AwsPrice[];
    promotional: AwsPrice[];
  };
};
