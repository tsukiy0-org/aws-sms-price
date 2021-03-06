import React, { useState } from "react";
import { GetStaticProps } from "next";
import { AwsPriceList } from "../models/AwsPriceList";
import {
  Direction,
  Price,
  filterBySearch,
  sortByCountry,
  sortByPromoPrice,
  sortByTxPrice,
  toPriceList,
} from "../models/Price";

const SortIcon: React.FC<{
  direction: Direction;
}> = ({ direction }) => {
  switch (direction) {
    case 0:
      return null;
    case 1:
      return <>⬆</>;
    case -1:
      return <>⬇</>;
    default:
      return null;
  }
};

const Home: React.FC<{
  priceList: Price[];
}> = ({ priceList }) => {
  const [countryDirection, setCountryDirection] = useState<Direction>(0);
  const [promoDirection, setPromoDirection] = useState<Direction>(0);
  const [txDirection, setTxDirection] = useState<Direction>(0);
  const [search, setSearch] = useState<string>("");

  const filteredList = [
    sortByPromoPrice(promoDirection),
    sortByTxPrice(txDirection),
    sortByCountry(countryDirection),
    filterBySearch(search),
  ].reduce((acc, filter) => filter(acc), priceList);

  const bumpDirection = (current): Direction => {
    switch (current) {
      case 0:
        return 1;
      case 1:
        return -1;
      case -1:
        return 0;
      default:
        return 0;
    }
  };

  return (
    <>
      <label htmlFor="search">
        Search
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      <table>
        <thead>
          <tr>
            <th
              onClick={() => {
                setCountryDirection(bumpDirection(countryDirection));
              }}
            >
              country
              <SortIcon direction={countryDirection} />
            </th>
            <th>carrier</th>
            <th
              onClick={() => {
                setTxDirection(bumpDirection(txDirection));
              }}
            >
              price (tx)
              <SortIcon direction={txDirection} />
            </th>
            <th
              onClick={() => {
                setPromoDirection(bumpDirection(promoDirection));
              }}
            >
              price (promo)
              <SortIcon direction={promoDirection} />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((_) => (
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
