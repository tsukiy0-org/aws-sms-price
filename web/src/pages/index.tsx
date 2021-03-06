import React from "react";
import { GetStaticProps } from "next";
import { PriceList } from "../models/PriceList";

const Home: React.FC<{
  priceList: PriceList;
}> = ({ priceList }) => {
  // eslint-disable-next-line no-console
  console.log(priceList);

  return <>{JSON.stringify(priceList)}</>;
};

export default Home;

export const getStaticProps: GetStaticProps<{
  priceList: PriceList;
}> = async () => {
  const res = await fetch(
    "https://s3.amazonaws.com/aws-sms-pricing-info-prod-us-east-1/smsPricesAndDeliverability-latest.json",
  );

  return {
    props: {
      priceList: await res.json(),
    },
  };
};
