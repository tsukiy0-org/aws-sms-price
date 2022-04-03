import { AwsSmsPriceService } from "./AwsSmsPriceService";

describe("AwsSmsPriceService", () => {
  describe("hasCountry", () => {
    let service: AwsSmsPriceService;

    beforeEach(() => {
      service = new AwsSmsPriceService();
    });

    it("when country in price list then true", () => {
      const actual = service.hasCountry("US");

      expect(actual).toEqual(true);
    });

    it("when country not in price list then false", () => {
      const actual = service.hasCountry("ABCD");

      expect(actual).toEqual(false);
    });
  });
});
