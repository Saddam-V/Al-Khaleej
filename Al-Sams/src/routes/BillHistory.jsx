import { Outlet } from "react-router-dom";
import TableBillHistory from "../layouts/TableBillHistory";
import ButtonGroupBills from "../components/ButtonGroupBills";

function BillHistory() {
  return (
    <>
      <Outlet />
      <main>
        <ButtonGroupBills />
        <TableBillHistory />
      </main>
    </>
  );
}

export default BillHistory;

export async function loader({ params }) {
  const response = await fetch("http://localhost:3000/api/v1/bill?sort=".concat(params.option), {
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
  const response = await fetch("http://localhost:3000/api/v1/bill/search/".concat(params.cat), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const resData = await response.json();
  console.log("yes");
  return resData.data;
}
