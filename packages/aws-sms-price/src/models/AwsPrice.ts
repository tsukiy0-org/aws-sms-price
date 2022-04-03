import { CountryCode } from "./CountryCode";

export type AwsPrice = {
  mcc: string;
  mnc: string;
  name: string;
  carrierFee: number;
  domesticPrice: number;
  shortCodeCarrierFee?: number;
  shortCodeDomesticPrice?: number;
  tollFreeCarrierFee?: number;
  tollFreeDomesticPrice?: number;
  tenDlcCarrierFee?: number;
  tenDlcDomesticPrice?: number;
};

