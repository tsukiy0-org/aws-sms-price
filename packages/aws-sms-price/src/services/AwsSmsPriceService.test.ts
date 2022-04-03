import { CountryCodeNotFoundError } from "../models";
import { AwsSmsPriceService } from "./AwsSmsPriceService";

describe("AwsSmsPriceService", () => {
  let service: AwsSmsPriceService;

  beforeEach(() => {
    service = new AwsSmsPriceService();
  });

  describe("listCountryCodes", () => {
    it("lists all countries in price list", () => {
      const actual = service.listCountryCodes();

      expect(actual.length).toEqual(246);
    });
  });

  describe("hasCountry", () => {
    it("when country in price list then true", () => {
      const actual = service.hasCountry("US");

      expect(actual).toEqual(true);
    });

    it("when country not in price list then false", () => {
      const actual = service.hasCountry("ABCD");

      expect(actual).toEqual(false);
    });
  });

  describe("getCountryTransactionalPrices", () => {
    it("when given country code then gets transactional prices", () => {
      const actual = service.getCountryTransactionalPrices("US");

      expect(actual).toEqual([
        {
          mcc: "default",
          mnc: "default",
          name: "All Networks",
          carrierFee: 0.00266,
          domesticPrice: 0.00581,
          shortCodeCarrierFee: 0.00276,
          shortCodeDomesticPrice: 0.00581,
          tollFreeCarrierFee: 0.0025,
          tollFreeDomesticPrice: 0.00581,
          tenDlcCarrierFee: 0.00266,
          tenDlcDomesticPrice: 0.00581,
        },
      ]);
    });

    it("when country not in price list then throw", () => {
      const action = () => service.getCountryTransactionalPrices("ABCD");

      expect(action).toThrowError(CountryCodeNotFoundError);
    });
  });

  describe("getCountryPoromotionalPrices", () => {
    it("when given country code then gets transactional prices", () => {
      const actual = service.getCountryTransactionalPrices("US");

      expect(actual).toEqual([
        {
          mcc: "default",
          mnc: "default",
          name: "All Networks",
          carrierFee: 0.00266,
          domesticPrice: 0.00581,
          shortCodeCarrierFee: 0.00276,
          shortCodeDomesticPrice: 0.00581,
          tollFreeCarrierFee: 0.0025,
          tollFreeDomesticPrice: 0.00581,
          tenDlcCarrierFee: 0.00266,
          tenDlcDomesticPrice: 0.00581,
        },
      ]);
    });

    it("when country not in price list then throw", () => {
      const action = () => service.getCountryPromotionalPrices("ABCD");

      expect(action).toThrowError(CountryCodeNotFoundError);
    });
  });
});
