import { Outlet } from "react-router-dom";
import TableCatalogue from "../layouts/TableCatalogue";
import ButtonGroupCat from "../components/ButtonGroupCat";

function Catalogue() {
  return (
    <>
      <Outlet />
      <main>
        <ButtonGroupCat />
        <TableCatalogue />
      </main>
    </>
  );
}

export default Catalogue;

export async function loader({ params }) {
  const response = await fetch("http://localhost:4000/api/v1/cat?sort=".concat(params.option), {
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
  const response = await fetch("http://localhost:4000/api/v1/cat/search/".concat(params.cat), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const resData = await response.json();
  console.log("yes");
  return resData.data;
}
