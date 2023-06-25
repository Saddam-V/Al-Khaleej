import { Outlet } from "react-router-dom";
import TableTotalStock from "../layouts/TableTotalStock";
import ButtonGroup from "../components/ButtonGroup";

function TotalStock() {
  return (
    <>
      <Outlet />
      <main>
        <ButtonGroup />
        <TableTotalStock />
      </main>
    </>
  );
}

export default TotalStock;

export async function loader({ params }) {
  console.log(localStorage.getItem("token"));
  const response = await fetch("http://localhost:3000/api/v1/totalStock?sort=".concat(params.option), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const resData = await response.json();
  return resData.data;
}

export async function searchTotalLoader({ params }) {
  console.log("in cat");
  const response = await fetch("http://localhost:3000/api/v1/totalStock/search/" + params.cat + "/" + params.col, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const resData = await response.json();
  console.log(resData);
  return resData.data;
}
