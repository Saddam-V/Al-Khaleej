import { Outlet } from "react-router-dom";
import TableSearchStock from "../layouts/TableSearchStock";
import ButtonGroup from "../components/ButtonGroup";

function SearchStock() {
  return (
    <>
      <Outlet />
      <main>
        <ButtonGroup />
        <TableSearchStock />
      </main>
    </>
  );
}

export default SearchStock;

export async function searchTotalLoader({ params }) {
  console.log("in cat");
  const response = await fetch("http://localhost:4000/api/v1/totalStock/search/" + params.cat + "/" + params.col, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const resData = await response.json();
  console.log(resData);
  return resData.data;
}
