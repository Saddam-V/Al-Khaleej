import { Outlet } from "react-router-dom";
import TableTotalStock from "../layouts/TableTotalStock";
import ButtonGroup from "../components/ButtonGroup";
import PageNav from "../components/PageNav";

function TotalStock() {
  return (
    <>
      <Outlet />
      <main>
        <ButtonGroup />
        <TableTotalStock />
        <PageNav />
      </main>
    </>
  );
}

export default TotalStock;

export async function loader({ params }) {
  console.log(localStorage.getItem("token"));
  if (params.page) {
    const response = await fetch(
      "http://localhost:4000/api/v1/totalStock?sort=" + params.option + "&page=" + params.page + "&limit=" + params.limit,
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
    const response = await fetch("http://localhost:4000/api/v1/totalStock?sort=" + params.option, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const resData = await response.json();
    return resData.data;
  }
}

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
