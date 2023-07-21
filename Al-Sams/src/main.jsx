import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import StockHistory, { loader as stocksHistoryLoader, searchLoader as stockSearchLoader } from "./routes/StockHistory";
import TotalStock, { loader as totalStocksLoader, searchTotalLoader as totalSearchLoaderd } from "./routes/TotalStock";
import SearchStock, { searchTotalLoader as totalSearchLoader } from "./routes/SearchStock";
import NewStock, { action as newStockAction } from "./routes/NewStock";
import NewBill, { action as newBillAction } from "./routes/NewBill";
import BillHistory, { loader as billHistoryLoader, searchLoader as billSearchLoader } from "./routes/BillHistory";
import NewCat, { action as newCatAction } from "./routes/NewCat";
import Catalogue, { loader as catalogueLoader, searchLoader as catSearchLoader } from "./routes/Catalogue";
import Customer, { loader as customerLoader, searchLoader as customerSearchLoader } from "./routes/Customer";
import NewReturn, { action as newReturnAction } from "./routes/NewReturn";
import Return, { loader as returnLoader, searchLoader as returnSearchLoader } from "./routes/Return";
import Login, { action as newLoginAction } from "./routes/Login";
import App from "./components/App";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/logged-check",
    element: <App />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
        action: newLoginAction,
      },
      {
        path: "/stockHistory/:option?/:page?/:limit?",
        element: <StockHistory />,
        loader: stocksHistoryLoader,
      },
      {
        path: "/stockHistory/search/:cat?/:col?",
        element: <StockHistory />,
        loader: stockSearchLoader,
      },
      {
        path: "/total-stock/search/:cat?/:col?",
        element: <SearchStock />,
        loader: totalSearchLoader,
      },
      { path: "/billHistory/:option?", element: [<BillHistory />], loader: billHistoryLoader }, //
      { path: "/billHistory/search/:cat?", element: [<BillHistory />], loader: billSearchLoader }, //
      { path: "/create-stock", element: [<NewStock />], action: newStockAction },
      { path: "/create-bill", element: [<NewBill />], action: newBillAction },
      { path: "/create-cat", element: [<NewCat />], action: newCatAction },
      { path: "/return/:option?", element: [<Return />], loader: returnLoader },
      { path: "/return/search/:cat?", element: [<Return />], loader: returnSearchLoader }, //
      { path: "/create-return", element: [<NewReturn />], action: newReturnAction },
      { path: "/catalogue/:option?", element: [<Catalogue />], loader: catalogueLoader },
      { path: "/catalogue/search/:cat?", element: [<Catalogue />], loader: catSearchLoader }, //

      { path: "/customer/:option?", element: [<Customer />], loader: customerLoader },
      { path: "/customer/search/:cat?", element: [<Customer />], loader: customerSearchLoader },
      { path: "/total-stock/:option?/:page?/:limit?", element: [<TotalStock />], loader: totalStocksLoader },
      // { path: "/total-stock/page/:option?", element: [<TotalStock />], loader: totalStocksLoader },
      // {
      //   path: "/stock/success",
      //   element: [<Alert />, <NewStock />],
      //   action: newStockAction,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
