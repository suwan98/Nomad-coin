import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinPriceData } from "../api";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

interface PriceProps {
  coinId: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Price = () => {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data: price } = useQuery<IPriceData>(
    [["price"], coinId],
    () => fetchCoinPriceData(coinId)
  );
  const chartData = {
    options: {
      xaxis: {
        categories: [
          "1 hour",
          "6 hours",
          "12 hours",
          "24 hours",
          "7 days",
          "30 days",
          "1 year",
        ],
      },
    },
    series: [
      {
        name: "Price",
        data: [
          price?.quotes.USD.percent_change_1h || 0,
          price?.quotes.USD.percent_change_6h || 0,
          price?.quotes.USD.percent_change_12h || 0,
          price?.quotes.USD.percent_change_24h || 0,
          price?.quotes.USD.percent_change_7d || 0,
          price?.quotes.USD.percent_change_30d || 0,
          price?.quotes.USD.percent_change_1y || 0,
        ],
      },
    ],
  };

  return (
    <>
      <div>
        {isLoading ? (
          "가격 정보 로딩중"
        ) : (
          <>
            <Overview>
              <OverviewItem>{price?.name}</OverviewItem>
            </Overview>
            <Tabs>
              <OverviewItem>
                <Tab>현재 시세</Tab>
                <Tab>{price?.quotes.USD.price}</Tab>
              </OverviewItem>
              <OverviewItem>
                <Tab>24시간 변동 가격</Tab>
                <Tab>{price?.quotes.USD.market_cap_change_24h}</Tab>
              </OverviewItem>
            </Tabs>
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="line"
              height={350}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Price;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.listColor};

  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
  background-color: ${(props) => props.theme.listColor};
  border-radius: 10px;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  padding: 7px 0px;
  border-radius: 10px;
`;
