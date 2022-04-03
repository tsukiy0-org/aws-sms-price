import fetch from "cross-fetch";
import fs from "fs";
import path from "path";

const main = async () => {
  const url =
    "https://s3.amazonaws.com/aws-messaging-pricing-information/TextMessageOutbound/prices.json";

  const res = await fetch(url);

  const file = path.resolve(
    __dirname,
    "../../../packages/aws-sms-price/src/services/data.json"
  );

  fs.writeFileSync(file, await res.text());
};

main();
