import { Link, Form, redirect } from "react-router-dom";
import classes from "./NewStock.module.css";
import Modal from "../components/Modal";
import { Outlet } from "react-router-dom";

function NewStock() {
  return (
    <Modal>
      <h2>Add Stock</h2>
      <Form id="create-course-form" method="post" className={classes.form}>
        <p className="flex flex-row justify-around mt-5 mb-5">
          <label htmlFor="body" className="w-1/2">
            Catalogue Number
          </label>
          <input type="text" id="name" name="catNum" required />
        </p>
        <p className="flex flex-row justify-around mt-5 mb-5">
          <label htmlFor="name" className="w-1/2">
            Color Number
          </label>
          <input type="text" id="name" name="colNum" required />
        </p>
        <p className="flex flex-row justify-around mt-5 mb-5">
          <label htmlFor="name" className="w-1/2">
            Meter
          </label>
          <input type="text" id="name" name="meter" required />
        </p>
        {/* <p className="flex flex-row justify-around mt-5 mb-5">
          <label htmlFor="name" className="w-1/2">
            Rate
          </label>
          <input type="text" id="name" name="rate" required />
        </p> */}
        <p className="flex justify-end">
          <button className="bg-button rounded p-3 mr-10 w-44">Submit</button>
          <Link className="bg-backclr text-button rounded p-3 mr-10 w-32" to="../stockHistory/-createdAt" type="button">
            Back
          </Link>
        </p>
      </Form>
      <Outlet />
    </Modal>
  );
}

export default NewStock;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { CatNam: '...', CatNum: '...' }
  console.log(postData);
  await fetch("http://localhost:3000/api/v1/stockHistory", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((response) => {
    if (!response.ok) alert("Failed");
    else {
      if (response.status === 201) alert("New Stock Created");
      else if (response.status === 200) alert("Updated");
    }
  });
  // .then((data) => {
  //   this.setState({ isLoading: false, downlines: data.response });
  //   console.log("DATA STORED");
  // })
  // .catch((error) => {
  //   console.log("error: " + error);
  //   this.setState({ requestFailed: true });
  // });
  document.getElementById("create-course-form").reset();
  document.getElementById("name").focus();
  return null;
}
