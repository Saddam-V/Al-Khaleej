import { Outlet } from "react-router-dom";
import TableStockHistory from "../layouts/TableStockHistory";
import ButtonGroup from "../components/ButtonGroup";

function StockHistory() {
  return (
    <>
      <Outlet />
      <main>
        <ButtonGroup />
        <TableStockHistory />
      </main>
    </>
  );
}

export default StockHistory;

export async function loader({ params }) {
  console.log("in Option");
  const response = await fetch("http://localhost:3000/api/v1/stockHistory?sort=".concat(params.option), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const resData = await response.json();
  console.log("yes");
  return resData.data;
}

export async function searchLoader({ params }) {
  console.log("in cat");
  const response = await fetch("http://localhost:3000/api/v1/stockHistory/search/" + params.cat + "/" + params.col, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const resData = await response.json();
  console.log(resData);
  return resData.data;
}
