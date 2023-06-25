import { Outlet } from "react-router-dom";
import TableCustomer from "../layouts/TableCustomer";
import ButtonGroupCust from "../components/ButtonGroupCust";

function Customer() {
  return (
    <>
      <Outlet />
      <main>
        <ButtonGroupCust />
        <TableCustomer />
      </main>
    </>
  );
}

export default Customer;

export async function loader({ params }) {
  const response = await fetch("http://localhost:3000/api/v1/cust?sort=".concat(params.option), {
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
  const response = await fetch("http://localhost:3000/api/v1/cust/search/".concat(params.cat), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const resData = await response.json();
  console.log("yes");
  return resData.data;
}
