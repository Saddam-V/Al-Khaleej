import { Outlet } from "react-router-dom";
import TableStockHistory from "../layouts/TableStockHistory";
import ButtonGroup from "../components/ButtonGroup";
import PageNav from "../components/PageNav";

function StockHistory() {
  return (
    <>
      <Outlet />
      <main>
        <ButtonGroup />
        <TableStockHistory />
        <PageNav />
      </main>
    </>
  );
}

export default StockHistory;

export async function loader({ params }) {
  if (params.page) {
    const response = await fetch(
      "http://localhost:4000/api/v1/stockHistory?sort=" + params.option + "&page=" + params.page + "&limit=" + params.limit,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const resData = await response.json();
    return resData.data;
  } else {
    const response = await fetch("http://localhost:4000/api/v1/stockHistory?sort=".concat(params.option), {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const resData = await response.json();
    return resData.data;
  }
}

export async function searchLoader({ params }) {
  console.log("in cat");
  const response = await fetch("http://localhost:4000/api/v1/stockHistory/search/" + params.cat + "/" + params.col, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const resData = await response.json();
  console.log(resData);
  return resData.data;
}
