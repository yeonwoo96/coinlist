import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Price from "./routes/Price";
import WorthChart from "./routes/Chart";

export const Router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: "/:coinId",
        element: <Coin />,
        children: [
          {
            path: "price",
            element: <Price />,
          },
          {
            path: "chart",
            element: <WorthChart />,
          },
        ],
      },
    ],
  },
]);
