import React from "react";
import { GetStaticProps } from "next";
import { AwsPriceList } from "../models/AwsPriceList";
import { Price, toPriceList } from "../models/Price";

const Home: React.FC<{
  priceList: Price[];
}> = ({ priceList }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>country</th>
            <th>carrier</th>
            <th>price (tx)</th>
            <th>price (promo)</th>
          </tr>
        </thead>
        <tbody>
          {priceList.map((_) => (
            <tr>
              <td>{_.country}</td>
              <td>{_.name}</td>
              <td>{_.transPrice}</td>
              <td>{_.promoPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<{
  priceList: readonly Price[];
}> = async () => {
  const res = await fetch(
    "https://s3.amazonaws.com/aws-sms-pricing-info-prod-us-east-1/smsPricesAndDeliverability-latest.json",
  );

  const awsPriceList = (await res.json()) as AwsPriceList;

  return {
    props: {
      priceList: toPriceList(awsPriceList),
    },
  };
};
