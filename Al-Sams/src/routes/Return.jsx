import { Outlet, redirect } from "react-router-dom";
import TableReturn from "../layouts/TableReturn";
import ButtonGroupReturn from "../components/ButtonGroupReturn";

function Return() {
  return (
    <>
      <Outlet />
      <main>
        <ButtonGroupReturn />
        <TableReturn />
      </main>
    </>
  );
}

export default Return;

export async function loader({ params }) {
  console.log("in Option");
  let resData;
  const res = await fetch("http://localhost:3000/api/v1/return?sort=".concat(params.option), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then(async (response) => {
    resData = await response.json();
    console.log("yes");
  });
  return resData.data;
}

export async function searchLoader({ params }) {
  console.log("in cat");
  const response = await fetch("http://localhost:3000/api/v1/return/search/".concat(params.cat), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  const resData = await response.json();
  console.log(resData);
  return resData.data;
}
