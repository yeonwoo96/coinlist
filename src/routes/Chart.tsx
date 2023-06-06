import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import { useOutletContext } from "react-router";

interface ChartProps {
  coinId: string;
}
function Chart() {
  const { coinId } = useOutletContext<ChartProps>(); // {food: "pizza"}
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return <h1>Chart</h1>;
}

export default Chart;
