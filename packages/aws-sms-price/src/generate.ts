import fetch from "cross-fetch";
import fs from "fs";

const url =
  "https://s3.amazonaws.com/aws-messaging-pricing-information/TextMessageOutbound/prices.json";

const res = await fetch(url);

console.log(await res.json());
