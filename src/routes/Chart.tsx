import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import { useOutletContext } from "react-router";
import Chart from "react-apexcharts";
interface ChartProps {
  coinId: string;
}
interface Idata {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
function WorthChart() {
  const { coinId } = useOutletContext<ChartProps>(); // {food: "pizza"}
  const { isLoading, data } = useQuery<Idata[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <Chart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => parseInt(price.close)) as number[],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,

              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["blue"],
                stops: [0, 100],
              },
            },

            colors: ["red"],
          }}
        />
      )}
    </div>
  );
}

export default WorthChart;
