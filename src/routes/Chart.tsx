import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistoryData } from "../api";
import ReactApexChart from "react-apexcharts";

interface IHistoryData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const Chart = () => {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistoryData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistoryData(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const chartData =
    data?.map((item) => ({
      x: new Date(item.time_close),
      y: [item.open, item.high, item.low, item.close],
    })) ?? [];

  return (
    <div>
      {isLoading ? (
        "loadingChart"
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: chartData,
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              colors: ["#0fbcf9"],
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
